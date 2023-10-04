import { BaseRoutes, IRoute } from '.';
import { IUser } from "../model"; 
import passport from 'passport';
import { Request, Response } from 'express';

export class AuthRoutes extends BaseRoutes {
  routes: IRoute[] = [
    {
      path: '/login',
      secure: false,
      method: 'post',
      handler: this.login.bind(this),
    },
  ];
  secureMiddleware = passport.authenticate('jwt', { session: false });

  async login(req: Request, res: Response): Promise<Response> { 
    
    passport.authenticate("local", (err: string, user: IUser) => { 
      if(user) { 
        const token = this.services.auth.createToken(user); 
        return res.json(this.successResponse({user, token})); 

      }
      return res.status(200).json(this.errorResponse(err || "unspecified error"));
    })(req, res);
    return null; 
  }

}
