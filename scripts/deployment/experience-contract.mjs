const GOOD_CLS_MAX = 0.1;
const GOOD_LCP_MAX_MS = 2500;

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

export function median(values) {
  requireCondition(Array.isArray(values) && values.length > 0, 'Metric samples are required');
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

export function assertDeliveredExperience({
  lcpSamples,
  clsByRoute,
  externalFontRequests,
  reflow,
}) {
  requireCondition(
    lcpSamples.every((sample) => Number.isFinite(sample) && sample > 0),
    'LCP samples must be positive finite values',
  );
  const medianLcp = median(lcpSamples);
  requireCondition(
    medianLcp <= GOOD_LCP_MAX_MS,
    `Median delivered lab LCP ${medianLcp.toFixed(0)}ms exceeds ${GOOD_LCP_MAX_MS}ms`,
  );

  for (const [route, value] of Object.entries(clsByRoute)) {
    requireCondition(Number.isFinite(value) && value >= 0, `Invalid CLS value for ${route}`);
    requireCondition(
      value <= GOOD_CLS_MAX,
      `Delivered CLS ${value.toFixed(3)} exceeds ${GOOD_CLS_MAX} on ${route}`,
    );
  }

  requireCondition(externalFontRequests.length === 0, 'Delivered site requested external fonts');
  requireCondition(reflow.primaryHeadingVisible, 'Primary heading is not visible at 200% zoom');
  requireCondition(reflow.primaryActionVisible, 'Primary action is not visible at 200% zoom');
  requireCondition(
    reflow.scrollWidth <= reflow.clientWidth + 1,
    'Delivered site has page-level horizontal overflow at 200% zoom',
  );

  return { medianLcp, clsByRoute };
}

export const thresholds = {
  clsMax: GOOD_CLS_MAX,
  lcpMaxMs: GOOD_LCP_MAX_MS,
};
