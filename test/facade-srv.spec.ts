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

  test('should stop the worker', async function() {
    await worker?.stop().catch(
      err => worker?.logger.warn('Ignored following error:', err)
    );
  }, 1000);
});
