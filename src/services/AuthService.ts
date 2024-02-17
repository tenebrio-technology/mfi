import { BaseService } from '.';
import { User, IUser } from '../model/User';

import jwt from 'jsonwebtoken';

export class AuthService extends BaseService {
  // Called via passport to validate user credentials.
  async localStrategy(
    username: string,
    password: string,
    done: (err: string | null, user?: IUser) => void,
  ): Promise<void> {
    const user = await User.findOne({ where: { username, password } });
    return done(user ? null : 'Unknown username or password', user);
  }

  async serializeUser(
    user: IUser,
    done: (err: string, user: string) => void,
  ): Promise<void> {
    return done(null, `${user.id}`);
  }

  async deserializeUser(
    id: string,
    done: (err: string, user: IUser) => void,
  ): Promise<void> {
    const user = await User.findByPk(id);
    return done(null, user.get());
  }

  createToken(user: IUser): string {
    const token = jwt.sign({ user }, 'SECRET');
    return token;
  }

  decryptToken(token: string): IUser {
    const payload = jwt.decode(token);
    if (payload) return payload['user'] as IUser;
    return null;
  }
}
