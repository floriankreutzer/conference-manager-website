import { verifyDemoEndpoint } from './demo-endpoint-contract.mjs';

const endpoint = process.argv[2] ?? '';
const mode = process.argv.includes('--send-delivery') ? 'delivery' : 'negative';

try {
  const result = await verifyDemoEndpoint({ endpoint, mode });
  console.log(`Demo endpoint ${result.mode} acceptance passed: ${result.endpoint}`);
  if (result.mode === 'delivery') {
    console.log(
      'Synthetic delivery request accepted. Confirm the functional mailbox received exactly one acceptance-test message before recording operational acceptance.',
    );
  } else {
    console.log('No delivery request was sent by this acceptance run.');
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Demo endpoint acceptance failed');
  process.exitCode = 1;
}
