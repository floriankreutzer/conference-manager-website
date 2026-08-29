const allowedModes = new Set(['negative', 'delivery']);

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

export function validateDemoEndpoint(value) {
  const url = new URL(value);
  requireCondition(url.protocol === 'https:', 'Demo endpoint must use HTTPS');
  requireCondition(!url.username && !url.password, 'Demo endpoint must not contain credentials');
  requireCondition(!url.search && !url.hash, 'Demo endpoint must not contain query or fragment');
  requireCondition(
    !['localhost', '127.0.0.1', '::1'].includes(url.hostname),
    'Demo endpoint must be public',
  );
  return url.href;
}

async function readJson(response) {
  const text = await response.text();
  try {
    return { text, value: JSON.parse(text) };
  } catch {
    throw new Error(`Demo endpoint returned non-JSON response for HTTP ${response.status}`);
  }
}

async function request(fetchImpl, endpoint, options) {
  const response = await fetchImpl(endpoint, {
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
    ...options,
  });
  const body = await readJson(response);
  return { response, body };
}

function formBody(overrides = {}) {
  return new URLSearchParams({
    firstName: 'Acceptance',
    lastName: 'Test',
    email: 'demo-acceptance@example.invalid',
    company: 'Conference Manager Acceptance Test',
    companySize: '250-999',
    message: 'Synthetic operational acceptance request. Do not treat as a sales lead.',
    locale: 'en',
    website: '',
    privacyAcknowledged: 'true',
    ...overrides,
  }).toString();
}

function expectResponse(result, statusCode, code) {
  requireCondition(
    result.response.status === statusCode,
    `Expected HTTP ${statusCode}, received ${result.response.status}`,
  );
  if (code) {
    requireCondition(
      result.body.value?.code === code,
      `Expected response code ${code}, received ${String(result.body.value?.code)}`,
    );
  }
}

export async function verifyDemoEndpoint({
  endpoint,
  mode = 'negative',
  fetchImpl = globalThis.fetch,
}) {
  requireCondition(allowedModes.has(mode), 'Acceptance mode must be negative or delivery');
  requireCondition(typeof fetchImpl === 'function', 'Fetch implementation is required');
  const validatedEndpoint = validateDemoEndpoint(endpoint);

  const methodResult = await request(fetchImpl, validatedEndpoint, { method: 'GET' });
  expectResponse(methodResult, 405, 'method_not_allowed');

  const contentTypeResult = await request(fetchImpl, validatedEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
  expectResponse(contentTypeResult, 415, 'unsupported_media_type');

  const invalidMarker = '<acceptance-invalid-marker>';
  const invalidResult = await request(fetchImpl, validatedEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ firstName: invalidMarker }).toString(),
  });
  expectResponse(invalidResult, 400, 'invalid_request');
  requireCondition(
    !invalidResult.body.text.includes(invalidMarker),
    'Invalid submitted content was reflected in the public response',
  );

  const honeypotResult = await request(fetchImpl, validatedEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody({ website: 'bot-marker' }),
  });
  expectResponse(honeypotResult, 202);
  requireCondition(
    honeypotResult.body.value?.status === 'accepted',
    'Honeypot response must remain generic accepted',
  );

  if (mode === 'delivery') {
    const deliveryResult = await request(fetchImpl, validatedEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody(),
    });
    expectResponse(deliveryResult, 202);
    requireCondition(
      deliveryResult.body.value?.status === 'accepted',
      'Synthetic delivery request was not accepted',
    );
  }

  return { endpoint: validatedEndpoint, mode };
}
