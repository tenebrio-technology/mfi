import { Database } from '../../src/model';
import { MockLogger } from '../helpers';

describe('Databse', () => {
  test('Connect', () => {
    const db = Database.connect(
      { dialect: 'sqlite', storage: ':memory:' },
      new MockLogger(),
    );
    expect(db).toBeInstanceOf(Database);
  });
});
