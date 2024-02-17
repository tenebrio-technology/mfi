/* eslint-disable jest/expect-expect */

import { IHabitat } from '../../src/model';
import { Server } from '../../src/server';
import { MockLogger } from './../helpers/Logger.mock';
import { TestDatabase } from './../helpers/TestDatabase';
import request from 'supertest';

describe('Habitat Routes', () => {
  let server: Server;
  let db: TestDatabase;
  let authHeader: { Authorization: string };
  const logger = new MockLogger();

  beforeAll(async () => {
    db = new TestDatabase(logger);
    await db.build({ force: true });
    await db.populate();

    server = new Server(db, logger);
    await server.listen();
    if (!server.listening) throw 'Server did not attach to port';

    const token = server.services.auth.createToken({
      username: 'testuser',
      password: 'testpass',
    });
    authHeader = { Authorization: 'Bearer ' + token };
  });

  afterAll(async () => {
    await server.close();
  });

  test('get /fetch secured', async () => {
    await request(server.instance).get('/habitats').expect(401);
  });

  test('post /habitat/add secured', async () => {
    await request(server.instance).post('/habitat/add').expect(401);
  });

  test('delete /habitat secured', async () => {
    await request(server.instance).delete('/habitat/1').expect(401);
  });

  test('get /fetch', async () => {
    const res = await request(server.instance).get('/habitats').set(authHeader);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toEqual(
      expect.objectContaining({
        payload: expect.arrayContaining([
          expect.objectContaining({ name: 'habitat1' }),
          expect.objectContaining({ name: 'habitat5' }),
        ]),
      }),
    );
  });

  test('post /habitat/add', async () => {
    const res = await request(server.instance)
      .post('/habitat/add')
      .set(authHeader)
      .send({ name: 'habitat_add_test' });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty(
      'payload',
      expect.objectContaining({ name: 'habitat_add_test' }),
    );
    const habitat = res.body.payload as IHabitat;
    await server.services.habitat.delete(habitat);
  });

  test('delete /habitat', async () => {
    const habitat = await server.services.habitat.add({
      name: 'habitat_delete_test',
    });
    const res = await request(server.instance)
      .delete('/habitat/' + habitat.id)
      .set(authHeader);
    expect(res.status).toEqual(200);
  });
});
