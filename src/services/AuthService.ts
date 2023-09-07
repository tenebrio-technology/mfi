import { BaseService } from "."; 
import { User, IUser } from "../model/User"; 


import jwt from "jsonwebtoken"; 

export class AuthService extends BaseService { 



  // Called via passport to validate user credentials. 
  async localStrategy(username:string, password:string, done:(err:string | null, user?: any) => void) {
    this.logger.debug("localStrategy called"); 
    const user = await User.findOne({where: {username, password}});
    return done(user ? '' : 'Unknown username or password', user); 
  }

  async serializeUser(user: IUser, done:(err: string, user: string) => void) {
    this.logger.debug("localStrategy called"); 
    return done(null, `${user.id}`);     
  }

  async deserializeUser(id: string, done:(err:string, user: IUser) => void) { 
    const user = await User.findByPk(id); 
    console.debug("User: ", user.get()); 
    return done(null, user.get()); 
  }

  createToken(user) { 
    const token = jwt.sign({user}, 'SECRET'); 
    console.log(`Token '${token}`); 
    return token; 
  }

}
