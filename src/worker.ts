import { ServiceConfig } from '@restorecommerce/service-config';
import { Logger } from 'winston';
import {
  createFacade,
  Facade,
  reqResLogger,
  resourceModule,
  identityModule,
  accessControlModule,
  fulfillmentModule,
  catalogModule,
  indexingModule,
  invoicingModule,
  notificationModule,
  orderingModule,
  ostorageModule,
  paymentModule,
  schedulingModule
} from '@restorecommerce/facade';

export class Worker {

  readonly cfg: ServiceConfig;
  readonly logger: Logger;

  facade: Facade<any[]>;

  constructor(cfg: ServiceConfig, logger: Logger) {
    this.cfg = cfg;
    this.logger = logger;
  }

  get listening() {
    return this.facade.listening;
  }

  async start(): Promise<void> {
    this.facade = createFacade({
      ...this.cfg.get('facade'),
      env: this.cfg.get('NODE_ENV'),
      logger: this.logger,
    })
      .useModule(identityModule({
        identitySrvClientConfig: this.cfg.get('identity').client,
        config: this.cfg.get('identity'),
        apiKey: this.cfg.get('apiKey')
      }))
      .useModule(resourceModule({config: this.cfg.get('resource')}))
      .useModule(accessControlModule({config: this.cfg.get('access_control')}))
      .useModule(fulfillmentModule({config: this.cfg.get('fulfillment')}))
      .useModule(catalogModule({config: this.cfg.get('catalog')}))
      .useModule(indexingModule({config: this.cfg.get('indexing')}))
      .useModule(invoicingModule({config: this.cfg.get('invoicing')}))
      .useModule(notificationModule({config: this.cfg.get('notification')}))
      .useModule(orderingModule({config: this.cfg.get('ordering')}))
      .useModule(ostorageModule({config: this.cfg.get('ostorage')}))
      .useModule(paymentModule({config: this.cfg.get('payment')}))
      .useModule(schedulingModule({config: this.cfg.get('scheduling')}))
      .useMiddleware(reqResLogger({logger: this.logger}));

    return this.facade.start();
  }

  async stop(): Promise<void> {
    return this.facade.stop();
  }

}
