import { Habitat } from '../../src/model';
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

  test('Create a habitat', async () => {
    const habitat = await Habitat.create({ name: 'test' });
    expect(habitat).toMatchObject({ name: 'test' });
    await habitat.destroy();
  });

  test('fetch habits', async () => {
    const habitats = await Habitat.findAll({ raw: true });
    expect(habitats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'habitat1' }),
        expect.objectContaining({ name: 'habitat5' }),
      ]),
    );
  });
});
