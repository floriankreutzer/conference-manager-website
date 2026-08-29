import { verifyFontAssets } from './font-assets-contract.mjs';

try {
  const result = await verifyFontAssets();
  if (result.status === 'pending') {
    console.log('Font asset gate passed: governance status is pending and no WOFF2 binaries are present.');
  } else {
    console.log(`Font asset gate passed: ${result.files.length} governed WOFF2 asset(s) verified.`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Font asset verification failed');
  process.exitCode = 1;
}
