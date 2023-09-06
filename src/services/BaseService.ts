
import { Services } from "./Services"; 
import { Database } from "../model"; 
import { IServerLogger } from "../types/types"; 


export class BaseService {

    services: Services; 
    storage: Database; 
    logger: IServerLogger; 

    constructor(services: Services, storage: Database, logger: IServerLogger) {
      this.services = services; 
      this.storage = storage; 
      this.logger = logger; 
    }
  
}
