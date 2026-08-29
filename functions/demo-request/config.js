const allowedTemRegions = new Set(['fr-par']);

function isPresent(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function readRequiredEnv(env = process.env) {
  const region = isPresent(env.SCW_TEM_REGION) ? env.SCW_TEM_REGION.trim() : 'fr-par';
  if (!allowedTemRegions.has(region)) return null;

  const config = {
    secretKey: env.SCW_SECRET_KEY,
    projectId: env.SCW_PROJECT_ID,
    region,
    senderEmail: env.DEMO_REQUEST_SENDER_EMAIL,
    senderName: isPresent(env.DEMO_REQUEST_SENDER_NAME)
      ? env.DEMO_REQUEST_SENDER_NAME.trim()
      : 'Conference Manager',
    recipientEmail: env.DEMO_REQUEST_RECIPIENT_EMAIL,
    recipientName: isPresent(env.DEMO_REQUEST_RECIPIENT_NAME)
      ? env.DEMO_REQUEST_RECIPIENT_NAME.trim()
      : 'Conference Manager Demo',
  };

  const requiredKeys = ['secretKey', 'projectId', 'senderEmail', 'recipientEmail'];
  if (requiredKeys.some((key) => !isPresent(config[key]))) return null;

  return {
    ...config,
    secretKey: config.secretKey.trim(),
    projectId: config.projectId.trim(),
    senderEmail: config.senderEmail.trim(),
    recipientEmail: config.recipientEmail.trim(),
  };
}
