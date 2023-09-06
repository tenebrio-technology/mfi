import { Server } from "../../src/server"; 
import { AddressInfo } from "net"; 
import { MockLogger } from "../helpers/Logger.mock";  

describe("Server Application", () => { 

  let server: Server; 
  let logger = new MockLogger(); 

  beforeAll(async () => {
    server = new Server(logger); 
    await server.listen(); 
    if(!server.listening)
      throw "Server did not attach to port"; 
  });

  afterAll( async () => {
    await server.close(); 
    console.log(logger.last()); 
  });

  test("Logging to console", () => { 
    expect(logger.item(0)).toContain('Tenebrio API Server'); 
    expect(logger.item(1)).toContain(`Listening on ${(server.instance.address() as AddressInfo).port}`); 
  });

  test("Logging to file", () => {

  });
}); 

