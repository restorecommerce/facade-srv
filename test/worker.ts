import { createServiceConfig } from '@restorecommerce/service-config';
import { createLogger } from '@restorecommerce/logger';
import { Worker } from '../src/worker';

export const createTestWorker = () => {
  const cfg = createServiceConfig(process.cwd());
  const logger = createLogger(cfg.get('logger'));
  return new Worker(cfg, logger);
};
