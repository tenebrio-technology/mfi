import { Services } from "../services"; 
import { IServerLogger } from "../types/types"; 
import { Request, Response } from "express"; 

export type Methods = "get" | "post" | "patch" | "delete"; 

export interface IRoute  { 
  path: string,
  secure: boolean,
  method: Methods; 
  handler: (req: Request, res: Response ) => any | void; 
}

export class BaseRoutes { 

  services: Services; 
  logger: IServerLogger
  routes: IRoute[] = []; 
  
  constructor(services: Services, logger: IServerLogger) {

      this.services = services; 
      this.logger = logger; 
  }

  errorResponse = (msg: string) => ({ success: false, errors: [msg] });
  successResponse = (payload: any) => ({ success: true, ...payload }); 

}