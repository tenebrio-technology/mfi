
import { BaseRoutes, IRoute, Methods } from "."; 
import { Request, Response } from "express"; 
export class PingRoutes extends BaseRoutes { 

  routes: IRoute[] = [
    {path: "/ping", secure: false, method: "get", handler: this.ping.bind(this)},
    {path: "/sping", secure: true, method: "get", handler: this.ping.bind(this)}
  ];
  
  async ping(req: Request, res: Response) { 
    return res.send(this.successResponse({msg: "pong"})); 
  }

}