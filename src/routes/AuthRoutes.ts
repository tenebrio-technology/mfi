
import { BaseRoutes, IRoute } from "."; 
import { Request, Response } from "express"; 
import passport from "passport"; 

export class AuthRoutes extends BaseRoutes { 

  routes: IRoute[] = [
    {path: "/login", secure: false, method: "post", handler: this.login.bind(this)},
  ];
  secureMiddleware = passport.authenticate('jwt', { session: false }); 

  async login(req: Request, res: Response) { 
    const { username } = req.body; 
    const token = this.services.auth.createToken(username); 
    return res.json(this.successResponse({username, token})); 

  }
}