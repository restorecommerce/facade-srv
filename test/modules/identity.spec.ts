import { Worker } from '../../src/worker';
import { createTestWorker } from '../worker';
import * as supertest from 'supertest';

describe('identity module', () => {
  let worker: Worker;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    worker = createTestWorker();
    await worker.start().catch(err => {
      worker.logger.error('Error starting worker: ', {err})
    })
    request = supertest(worker.facade['_server']);
  });

  it('should echo back a message', (done) => {
    request.post('/graphql')
      .send({
        query: `{ identity(input: { echo: "TEST" }) { message } }`
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(typeof res.body === 'object').toBeTruthy()
        expect(res.body.data.identity.message).toEqual('Echo: TEST')

        done();
      })
  });

  afterAll(async () => {
    worker && await worker.stop();
  })
})

