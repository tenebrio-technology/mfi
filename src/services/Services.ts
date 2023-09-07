import { AuthService } from "."; 
import { Database } from "../model"; 
import { IServerLogger } from "../types/types"; 
import jwt from "jsonwebtoken"; 

export class Services { 

  auth: AuthService; 

  constructor(storage : Database, logger: IServerLogger) {
    this.auth = new AuthService(this, storage, logger); 
  } 

 
}