import { readdir, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const DIST_DIR = 'dist';
const KIB = 1024;
const MIB = 1024 * KIB;

const budgets = {
  maxHtmlFileBytes: 180 * KIB,
  totalCssBytes: 160 * KIB,
  totalJavaScriptBytes: 80 * KIB,
  maxImageFileBytes: 750 * KIB,
  totalImageBytes: 1.5 * MIB,
  totalBuildBytes: 3 * MIB,
};

const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes >= MIB) return `${(bytes / MIB).toFixed(2)} MiB`;
  return `${(bytes / KIB).toFixed(1)} KiB`;
}

const files = await collectFiles(DIST_DIR);
const measurements = [];
let totalBuildBytes = 0;
let totalCssBytes = 0;
let totalJavaScriptBytes = 0;
let totalImageBytes = 0;
const violations = [];

for (const file of files) {
  const size = (await stat(file)).size;
  const extension = extname(file).toLowerCase();
  const displayPath = relative(DIST_DIR, file);

  totalBuildBytes += size;
  measurements.push({ path: displayPath, size });

  if (extension === '.html' && size > budgets.maxHtmlFileBytes) {
    violations.push(
      `${displayPath} is ${formatBytes(size)}; HTML budget is ${formatBytes(budgets.maxHtmlFileBytes)}`,
    );
  }

  if (extension === '.css') totalCssBytes += size;
  if (extension === '.js' || extension === '.mjs') totalJavaScriptBytes += size;

  if (imageExtensions.has(extension)) {
    totalImageBytes += size;
    if (size > budgets.maxImageFileBytes) {
      violations.push(
        `${displayPath} is ${formatBytes(size)}; image-file budget is ${formatBytes(budgets.maxImageFileBytes)}`,
      );
    }
  }
}

if (totalCssBytes > budgets.totalCssBytes) {
  violations.push(
    `CSS total is ${formatBytes(totalCssBytes)}; budget is ${formatBytes(budgets.totalCssBytes)}`,
  );
}

if (totalJavaScriptBytes > budgets.totalJavaScriptBytes) {
  violations.push(
    `JavaScript total is ${formatBytes(totalJavaScriptBytes)}; budget is ${formatBytes(budgets.totalJavaScriptBytes)}`,
  );
}

if (totalImageBytes > budgets.totalImageBytes) {
  violations.push(
    `Image total is ${formatBytes(totalImageBytes)}; budget is ${formatBytes(budgets.totalImageBytes)}`,
  );
}

if (totalBuildBytes > budgets.totalBuildBytes) {
  violations.push(
    `Build total is ${formatBytes(totalBuildBytes)}; budget is ${formatBytes(budgets.totalBuildBytes)}`,
  );
}

const largestFiles = measurements.sort((a, b) => b.size - a.size).slice(0, 8);
console.log('Static build budget summary');
console.log(`- build: ${formatBytes(totalBuildBytes)} / ${formatBytes(budgets.totalBuildBytes)}`);
console.log(`- CSS: ${formatBytes(totalCssBytes)} / ${formatBytes(budgets.totalCssBytes)}`);
console.log(
  `- JavaScript: ${formatBytes(totalJavaScriptBytes)} / ${formatBytes(budgets.totalJavaScriptBytes)}`,
);
console.log(`- images: ${formatBytes(totalImageBytes)} / ${formatBytes(budgets.totalImageBytes)}`);
console.log('- largest files:');
for (const file of largestFiles) console.log(`  - ${file.path}: ${formatBytes(file.size)}`);

if (violations.length > 0) {
  console.error('\nPerformance budget violations:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
}
