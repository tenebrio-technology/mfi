import { Database, User } from '../../src/model';
import { IDBLogger } from '../../src/types/types';

export class TestDatabase extends Database {
  constructor(logger: IDBLogger) {
    super({ dialect: 'sqlite', storage: ':memory:' }, logger);
  }

  async populate(): Promise<void> {
    await User.create({ username: 'testuser', password: 'testpass' });
  }
}
