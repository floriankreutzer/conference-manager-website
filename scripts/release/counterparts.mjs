import { parseDocument } from 'yaml';
import { isCommit } from './provenance.mjs';

const APP = 'floriankreutzer/conference-manager';
const API = 'floriankreutzer/conference-manager-api';

function requireCondition(condition) {
  if (!condition) throw new Error('COUNTERPART_INVALID');
}

function config(text) {
  requireCondition(typeof text === 'string' && text.length <= 1024 * 1024);
  const document = parseDocument(text, { schema: 'core', uniqueKeys: true });
  requireCondition(document.errors.length === 0 && document.warnings.length === 0);
  const value = document.toJS({ maxAliasCount: 0 });
  requireCondition(value && typeof value === 'object' && !Array.isArray(value));
  return value;
}

function checkouts(text, repository) {
  const workflow = config(text);
  requireCondition(
    workflow.jobs && typeof workflow.jobs === 'object' && !Array.isArray(workflow.jobs),
  );
  const result = [];
  for (const job of Object.values(workflow.jobs)) {
    if (!job.steps) continue;
    requireCondition(Array.isArray(job.steps));
    for (const step of job.steps) {
      if (
        typeof step.uses === 'string' &&
        step.uses.startsWith('actions/checkout@') &&
        step.with?.repository === repository
      )
        result.push(step.with);
    }
  }
  return result;
}

export function applicationCounterparts(workflow) {
  const checkoutsWithRepository = checkouts(workflow, API);
  requireCondition(checkoutsWithRepository.length > 0);
  requireCondition(checkoutsWithRepository.every((step) => isCommit(step.ref)));
  const refs = [...new Set(checkoutsWithRepository.map((step) => step.ref))];
  requireCondition(refs.length === 1);
  return [{ repository: API, commit: refs[0], purpose: 'paired-api' }];
}

export function apiCounterparts({ workflow, render, gitlink }) {
  const services = config(render).services;
  requireCondition(Array.isArray(services) && services.length === 2);
  const refs = services.map((service) => {
    requireCondition(Array.isArray(service.envVars));
    const entries = service.envVars.filter((variable) => variable.key === 'DEMO_FRONTEND_REF');
    requireCondition(entries.length === 1 && isCommit(entries[0].value));
    return entries[0].value;
  });
  requireCondition(new Set(refs).size === 1);
  const link = /^160000 commit ([a-f0-9]{40})\tvendor\/demo-frontend$/.exec(gitlink);
  requireCondition(link && link[1] === refs[0]);
  const sources = checkouts(workflow, APP);
  requireCondition(sources.length === 2);
  const frontend = sources.filter((step) => step.path === 'frontend');
  const acceptance = sources.filter((step) => step.path === 'acceptance');
  requireCondition(
    frontend.length === 1 && isCommit(frontend[0].ref) && frontend[0].ref === refs[0],
  );
  requireCondition(acceptance.length === 1 && isCommit(acceptance[0].ref));
  return [
    { repository: APP, commit: refs[0], purpose: 'embedded-frontend' },
    { repository: APP, commit: acceptance[0].ref, purpose: 'acceptance-contract' },
  ];
}
