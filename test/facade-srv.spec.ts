import { Worker } from '../src/worker';
import { createTestWorker } from './worker';

describe('facade-srv', () => {
  let worker: Worker;
  it('should start the worker', async () => {
    worker = createTestWorker();
    await worker?.start();
    expect(worker?.listening).toBe(true);
  });

  it('should wait for kafka', async () => {
    await new Promise((resolve, reject) => setTimeout(resolve, 10000));
  });

  it('should stop the worker', async () => {
    await worker?.stop();
  });
});
