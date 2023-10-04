import { Server } from '../src/server';
import { AddressInfo } from 'net';
import { MockLogger } from './helpers/Logger.mock';
import { TestDatabase } from './helpers/TestDatabase';

describe('Server Application', () => {
  let server: Server;
  const logger = new MockLogger();
  const storage = new TestDatabase(logger);

  beforeAll(async () => {
    server = new Server(storage, logger);
    await server.listen();
    if (!server.listening) throw 'Server did not attach to port';
  });

  afterAll(async () => {
    await server.close();
  });

  test('Logging', () => {
    expect(logger.first(1)).toContain('Tenebrio API Server');
    expect(logger.last(1)).toContain(
      `Listening on ${(server.instance.address() as AddressInfo).port}`,
    );
  });
});
