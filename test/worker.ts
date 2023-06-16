import { Worker } from '../src/worker.js';
import { createServiceConfig } from '@restorecommerce/service-config';
import { createLogger } from '@restorecommerce/logger';

export const createTestWorker = () => {
  const cfg = createServiceConfig(process.cwd() + '/test');
  const logger = createLogger(cfg.get('logger'));
  return new Worker(cfg, logger);
};
