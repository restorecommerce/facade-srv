import { 
  describe,
  expect,
  test
} from '@jest/globals';
import { type Worker } from '../src/worker.js';
import { createTestWorker } from './worker.js';

describe('facade-srv', () => {
  let worker: Worker;
  test('should start the worker', async function() {
    worker = createTestWorker();
    await worker?.start();
    expect(worker?.listening).toBe(true);
  });

  test('should wait for kafka', async function() {
    await new Promise((resolve, reject) => setTimeout(resolve, 25000));
  });

  test('should stop the worker', async function() {
    await worker?.stop().catch(
      err => worker?.logger.warn('Ignored following error:', err)
    );
  });
});
