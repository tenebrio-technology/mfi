import { User } from '../../src/model';
import { MockLogger, TestDatabase } from '../helpers';

describe('Create a new user', () => {
  let db: TestDatabase;
  const logger = new MockLogger();

  beforeAll(async () => {
    db = new TestDatabase(logger);
    await db.build({ force: true });
    await db.populate();
  });

  afterAll(async () => {
    await db.close();
  });

  test('Create a new user', async () => {
    const user = await User.create({ username: 'test', password: 'test' });
    expect(user).toMatchObject({ username: 'test', password: 'test' });
  });
});
