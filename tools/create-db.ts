import { Database, User } from '../src/model';
import { sequelizeConfig } from '../src/config';
import { MockLogger } from '../tests/helpers';
import minimist from "minimist"; 

const argv = minimist(process.argv.slice(2)); 

(async (): Promise<void> => {
  console.log("creating database..."); 
  const db = new Database(sequelizeConfig(), new MockLogger());
  await db.build({ force: true });

  if(argv.s) { 
    console.log("seeding database."); 
    await User.bulkCreate([{username: 'validuser', password: 'validpass'}]); 
  }

  db.close(); 
})();

