import { test, describe, expect } from 'vitest';
import { agent } from 'supertest';
import { createTestWorker, type Worker } from './worker.js';

describe('facade-srv', () => {
  let worker: Worker;
  test('should start the worker', async function() {
    worker = createTestWorker();
    await worker?.start();
    expect(worker?.listening).toBe(true);
  });

  test('should wait for kafka', async function() {
    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
  });

  test('should request a token', () => {
    const request = agent(worker.facade.server);
    const params = new URLSearchParams({
      identifier: 'nfuse-root.admin',
      password: 'CNQJrH%KAayeDpf3h',
      grant_type: 'password',
      scope: 'openid',
    }).toString();
    return new Promise<void>((resolve, reject) => {
      request
        .post('/token')
        .send(params)
        .set('Authorization', 'Basic VEVTVF9DTElFTlRfSUQ6VEVTVF9DTElFTlRfU0VDUkVU=')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            reject(err);
          }
          try {
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.id_token).toBeDefined();
          } catch(err) {
            reject(err);
          }
          resolve();
        });
    });
  });

  test('should stop the worker', async function() {
    await worker?.stop().catch(
      err => worker?.logger.warn('Ignored following error:', err)
    );
  }, 1000);
});
