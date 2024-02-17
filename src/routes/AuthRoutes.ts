import { BaseRoutes, IRoute } from '.';
import { IUser } from '../model';
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
    {
      path: '/verifytoken',
      secure: false,
      method: 'post',
      handler: this.verifyToken.bind(this),
    },
  ];

  secureMiddleware = passport.authenticate('jwt', { session: false });

  async login(req: Request, res: Response): Promise<Response> {
    if (!req.body.username) {
      return res.json(this.errorResponse('Username not set'));
    }

    if (!req.body.password) {
      return res.json(this.errorResponse('Password not set'));
    }

    return passport.authenticate('local', (err: string, user: IUser) => {
      if (user) {
        const token = this.services.auth.createToken(user);
        return res.json(this.successResponse({ user, token }));
      }
      return res
        .status(200)
        .json(this.errorResponse(err || 'unspecified error'));
    })(req, res);
  }

  async verifyToken(req: Request, res: Response): Promise<Response> {
    const token = req.body.token;
    if (!token) {
      return res.json(this.errorResponse('No token recieved'));
    }

    const user = this.services.auth.decryptToken(token);
    if (!user) return res.json(this.errorResponse('Invalid token'));

    return res.json(this.successResponse({ user, token }));
  }
}
