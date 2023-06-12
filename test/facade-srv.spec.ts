import { type Worker } from '../src/worker.js';
import { createTestWorker } from './worker.js';
import { jest } from '@jest/globals';

jest.useFakeTimers();

describe('facade-srv', () => {
  let worker: Worker;

  beforeAll(async () => {
    worker = createTestWorker();
    await worker.start().catch(err => {
      worker.logger.error('Error starting worker: ', {err});
    });
  });

  it('should start the worker', () => {
    expect(worker).toBeTruthy();
    expect(worker.listening).toBe(true);
  });

  afterAll(async () => {
    worker && await worker.stop();
  });
});
