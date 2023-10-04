/* eslint-disable jest/expect-expect */

import { TestDatabase, MockLogger } from "../helpers"; 
import { Server } from '../../src'; 
import  request from 'supertest'; 

describe('Auth Routes', () => {

  let server; 
  const logger = new MockLogger(); 

  beforeAll(async () => { 
    server = new Server(new TestDatabase(logger), logger); 
    server.listen(); 
  });

  afterAll(async () => { 
    await server.close(); 
    console.log(logger.last()); 
  });

  test("/login with empty values", async ()=> { 
    await request(server.instance).post("/login").expect({ success: false,errors: ['username required'] }); 
  });
  
  test("/login with empty password", async ()=> { 
    await request(server.instance).post("/login", {username: 'nopass'})
            .expect({ success: false, errors: ['password required'] }); 
  });

  test("/login with invalid username", async () => { 
    await request(server.instance).post("/login", {username: 'invalid', password: 'invalid'})
            .expect({ success: false, errors: ['Unknown username or password'] }); 
  });

  
  test("/login with invalid password", async () => { 
    await request(server.instance).post("/login", {username: 'valid', password: 'invalid'})
            .expect({ success: false, errors: ['Unknown username or password'] }); 
  });

  test("/login with valid credentials", async () => { 
    await request(server.instance).post("/login", {username: 'valid', password: 'valid'})
            .expect( (res) => {
                expect(res.body).toMatchObject({ success: true, user: { username: 'valid'}});
                expect(res.body).toHaveProperty('token')
            });
  }); 

});

