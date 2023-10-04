import { Database } from "../src/model"; 
import { sequelizeConfig } from "../src/config"; 
import { MockLogger } from "../tests/helpers"; 

(async () => {
const db = new Database(sequelizeConfig(), new MockLogger()); 
await db.build({force: true}); 
})(); 

