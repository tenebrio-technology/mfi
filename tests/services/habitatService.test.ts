import { Services } from '../../src/services';
import { TestDatabase, MockLogger } from '../helpers';

/* eslint-disable jest/no-done-callback */

describe('HabitatService', () => {
  let db: TestDatabase;
  let services: Services;
  const logger = new MockLogger();

  beforeAll(async () => {
    db = new TestDatabase(logger);
    await db.build({ force: true });
    await db.populate();
    services = new Services(db, logger);
  });

  afterAll(async () => {
    await db.close();
  });

  test('add', async () => {
    const habitat = await services.habitat.add({ name: 'add_test' });
    expect(habitat).toEqual(expect.objectContaining({ name: 'add_test' }));
    expect(habitat).toHaveProperty('id');
  });

  test('fetch', async () => {
    const habitats = await services.habitat.fetch();
    expect(habitats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'habitat1' }),
        expect.objectContaining({ name: 'habitat5' }),
      ]),
    );
  });
});
