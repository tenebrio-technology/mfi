import { PingRoutes } from '../../src/routes';
import {
  MockLogger,
  MockRequest,
  MockResponse,
  TestDatabase,
} from '../helpers';
import { Services } from '../../src/services';

describe('ping', () => {
  let logger;
  let db;
  let services;
  let routes;

  beforeAll(() => {
    logger = new MockLogger();
    db = new TestDatabase(logger);
    services = new Services(db, logger);
    routes = new PingRoutes(services, logger);
  });

  test('ping', () => {
    const res = new MockResponse();
    routes.ping(new MockRequest(), res);
    expect(JSON.parse(res.body)).toMatchObject({ success: true, msg: 'pong' });
  });
});
