
import { Services } from "../services"; 
import { IServerLogger } from "../types/types"; 
import { Router } from "express"; 
import path from "path"; 

import { PingRoutes, AuthRoutes } from "."; 
export class Routes { 

  path: string; 
  logger: IServerLogger; 
  ping: PingRoutes; 
  auth: AuthRoutes; 

  constructor(path: string, services: Services, logger: IServerLogger) {
    
    this.path = path; 
    this.logger = logger; 
    this.ping = new PingRoutes(services, logger); 
    this.auth = new AuthRoutes(services, logger); 

  }

  router(): Router {

    const router = Router(); 

    [this.ping, this.auth].forEach(routes => 

      routes.routes.forEach(route => {
        this.logger.info(`Attaching route: ${route.path}`);
        
        const pipe = [route.handler]; 
        route.secure && pipe.unshift(this.auth.secureMiddleware); 
        router[route.method](path.join(this.path, route.path), pipe);   
    }));  
    
    return router; 
  }
}