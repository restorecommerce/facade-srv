import { Worker } from './worker.js';
import { createServiceConfig } from '@restorecommerce/service-config';
import { createLogger } from '@restorecommerce/logger';

const startServer = () => {
  const cfg = createServiceConfig(process.cwd());
  const loggerCfg = cfg.get('logger');
  loggerCfg.esTransformer = (msg) => {
    msg.fields = JSON.stringify(msg.fields);
    return msg;
  };
  const logger = createLogger(loggerCfg);

  try {
    const worker = new Worker(cfg, logger);
    worker.start();
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
};

startServer();
