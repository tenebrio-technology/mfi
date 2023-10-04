import { TestDatabase, MockLogger } from './helpers';

const logger = new MockLogger();
const storage = new TestDatabase(logger);

(async (): Promise<void> => {
  storage.build();
  storage.populate();
})();
