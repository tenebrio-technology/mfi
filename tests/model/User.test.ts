import { Database, User } from "../../src/model"; 
import { MockLogger } from "../helpers/Logger.mock";

describe("Create a new user", () => { 

  let db: Database; 
  let logger = new MockLogger(); 

  beforeAll(async () => { 

    db = await Database.connect({dialect: 'sqlite', storage: ':memory:'}, logger); 
    await db.build({force: true}); 

  });

  afterAll(async () => { 

    await db.close(); 
    console.log(logger.last()); 

  });

  test('Create a new user', async() => {

    const user = await User.create({username: 'test', password: 'test'}); 
    expect(user).toMatchObject({username: 'test', password: 'test'});

  });


});
