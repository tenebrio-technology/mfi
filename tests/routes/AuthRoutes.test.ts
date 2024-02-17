/* eslint-disable jest/expect-expect */

import { Server } from '../../src/server';
import { MockLogger } from './../helpers/Logger.mock';
import { TestDatabase } from './../helpers/TestDatabase';
import request from 'supertest';
import jwt from 'jsonwebtoken';

describe('Auth Routes', () => {
  let server: Server;
  let db: TestDatabase;
  const logger = new MockLogger();

  beforeAll(async () => {
    db = new TestDatabase(logger);
    await db.build({ force: true });
    await db.populate();

    server = new Server(db, logger);
    await server.listen();
    if (!server.listening) throw 'Server did not attach to port';
  });

  afterAll(async () => {
    await server.close();
  });

  test('/login with empty values', async () => {
    await request(server.instance)
      .post('/login')
      .expect({ success: false, errors: ['Username not set'] });
  });

  test('/login with empty password', async () => {
    await request(server.instance)
      .post('/login')
      .send({ username: 'nopass' })
      .expect({ success: false, errors: ['Password not set'] });
  });

  test('/login with invalid username', async () => {
    await request(server.instance)
      .post('/login')
      .send({ username: 'invalid', password: 'invalid' })
      .expect({ success: false, errors: ['Unknown username or password'] });
  });

  test('/login with invalid password', async () => {
    await request(server.instance)
      .post('/login')
      .send({ username: 'valid', password: 'invalid' })
      .expect({ success: false, errors: ['Unknown username or password'] });
  });

  test('/login with valid credentials', async () => {
    const res = await request(server.instance)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.body).toEqual(
      expect.objectContaining({
        payload: expect.objectContaining({
          user: expect.objectContaining({ username: 'testuser' }),
        }),
      }),
    );
    expect(res.body.payload).toHaveProperty('token');
  });

  test('/verifyToken with no token', async () => {
    await request(server.instance)
      .post('/verifytoken')
      .send({})
      .expect((res) => {
        expect(res.body).toMatchObject({
          success: false,
          errors: ['No token recieved'],
        });
      });
  });

  test('/verifyToken with invalid token', async () => {
    const res = await request(server.instance)
      .post('/verifytoken')
      .send({ token: 'invalid' });
    expect(res.body).toMatchObject({
      success: false,
      errors: ['Invalid token'],
    });
  });

  test('/verifyToken with valid token', async () => {
    const user = { username: 'testuser', id: 1 };
    const token = jwt.sign({ user }, 'SECRET');
    const res = await request(server.instance)
      .post('/verifytoken')
      .send({ token });
    expect(res.body).toEqual(
      expect.objectContaining({
        payload: expect.objectContaining({
          user: expect.objectContaining({ username: 'testuser' }),
        }),
      }),
    );
  });
});
