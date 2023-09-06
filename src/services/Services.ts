import { AuthService } from "."; 
import { Database } from "../model"; 
import { IServerLogger } from "../types/types"; 

export class Services { 

  auth: AuthService; 

  constructor(storage : Database, logger: IServerLogger) {
    this.auth = new AuthService(this, storage, logger); 
  } 

}