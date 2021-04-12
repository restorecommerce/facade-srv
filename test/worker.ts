import { Worker } from '../src/worker';
import { createServiceConfig } from '@restorecommerce/service-config';
import { createLogger } from '@restorecommerce/logger';

export function createTestWorker() {
  const cfg = createServiceConfig(process.cwd() + '/test');
  const logger = createLogger(cfg.get('logger'));
  return new Worker(cfg, logger);
}
