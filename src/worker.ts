import { ServiceConfig } from '@restorecommerce/service-config';
import { Logger } from '@restorecommerce/logger';
import { createFacade, Facade, identityModule, reqResLogger } from '../libs/packages/facade/dist';

export class Worker {

  readonly cfg: ServiceConfig;
  readonly logger: Logger;

  facade: Facade;

  constructor(cfg: ServiceConfig, logger: Logger) {
    this.cfg = cfg;
    this.logger = logger;
  }

  get listening() {
    return this.facade.listening;
  }

  async start(): Promise<void> {
    const cfg = {
      env: this.cfg.get('NODE_ENV'),
      logger: this.cfg.get('logger'),
      facade: this.cfg.get('facade'),
      identity: this.cfg.get('identity'),
    };

    this.facade = createFacade({
      ...cfg.facade,
      env: cfg.env,
      logger: this.logger,
    }).useModule(identityModule(cfg.identity))
      .useMiddleware(reqResLogger({
        logger: this.logger
      }));

    return this.facade.start();
  }

  async stop(): Promise<void> {
    return this.facade.stop();
  }

}
