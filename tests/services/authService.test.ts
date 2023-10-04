import { AuthService, Services } from '../../src/services';
import { TestDatabase, MockLogger } from '../helpers';

/* eslint-disable jest/no-done-callback */

describe('AuthService', () => {
  let db: TestDatabase;
  let auth: AuthService;
  const logger = new MockLogger();

  beforeAll(async () => {
    db = new TestDatabase(logger);
    await db.build({ force: true });
    await db.populate();
    const services = new Services(db, logger);
    auth = new AuthService(services, db, logger);
  });

  afterAll(async () => {
    await db.close();
  });

  test('localStrategy with unknown username', (done) => {
    auth.localStrategy('unknown', 'unknown', (err, user) => {
      try {
        expect(err).toBe('Unknown username or password');
        expect(user).toBeNull();
      } catch (err) {
        done(err);
      }
      done();
    });
  });

  test('localStrategy with wrong password', (done) => {
    auth.localStrategy('testuser', 'unknown', (err, user) => {
      try {
        expect(err).toBe('Unknown username or password');
        expect(user).toBeNull();
      } catch (err) {
        done(err);
      }
      done();
    });
  });

  test('localStrategy with valid user/pass', (done) => {
    auth.localStrategy('testuser', 'testpass', (err, user) => {
      try {
        expect(err).toBeNull();
        expect(user).toMatchObject({ username: 'testuser' });
      } catch (err) {
        return done(err);
      }
      return done();
    });
  });

  test('serialize user', (done) => {
    auth.serializeUser({ id: 1, username: 'testuser' }, (err, user) => {
      try {
        expect(err).toBeNull();
        expect(user).toBe('1');
      } catch (err) {
        return done(err);
      }
      return done();
    });
  });

  test('deserialize user', (done) => {
    auth.deserializeUser('1', (err, user) => {
      try {
        expect(err).toBeNull();
        expect(user).toHaveProperty('username', 'testuser');
        expect(user).toHaveProperty('id', 1);
      } catch (err) {
        return done(err);
      }
      return done();
    });
  });
});
