import { Worker } from './worker.js';
import { createServiceConfig } from '@restorecommerce/service-config';
import { createLogger } from '@restorecommerce/logger';

const startServer = () => {
  const cfg = createServiceConfig(process.cwd());
  const logger = createLogger(cfg.get('logger'));

  try {
    const worker = new Worker(cfg, logger);
    worker.start();
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
};

startServer();
