
import http from 'http'; 
import { AddressInfo } from 'net'; 
import express, { Express } from 'express';
import morgan from 'morgan'; 
import passport from "passport"; 
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { IServerLogger } from "./types/types"; 
import { Services } from "./services"; 

export class Server { 

  port: number;       
  listening: boolean = false; 
  express: Express; 
  logger?: IServerLogger; 
  instance?: http.Server; 
  address?: AddressInfo; 
  services: Services; 

  constructor(logger?: IServerLogger) { 

    this.express = express(); 
    this.logger = this.initializeLogging(logger); 

    this.logger.info("Tenebrio API Server"); 
    this.initializeSecurity(); 
/*
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
    passport.use(new LocalStrategy({session: false}, (username, word, done) => done(null, username))); 
    passport.use(new JwtStrategy( {
      secretOrKey: 'SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },  (token, done) => { 
      console.log("Here! - token: ", token); 
      done(null, token); 
    }));

    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    
    this.express.post("/login", passport.authenticate('local', {session: false}), (req, res) => res.send("done.")); 
    this.express.get("/", passport.authenticate('jwt', {session: false}), (req, res) => res.send("Hello World!")); 
    */
  }

  initializeLogging(logger?: IServerLogger): IServerLogger { 
    
    logger = logger || {
      log: console.log, 
      data: console.log, 
      warn: console.warn, 
      error: console.error,
      info: console.info,
      http: console.info,
      debug: console.debug 
    }

    const stream = { write: (msg: any) => logger.http(msg) }; 
    this.express.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream})); 
    return logger; 
  }

  initializeSecurity() { 

    this.express.use(passport.initialize());  
    passport.serializeUser(this.services.auth.serializeUser.bind(this.services.auth));
    passport.deserializeUser(this.services.auth.deserializeUser.bind(this.services.auth));

    passport.use(new JwtStrategy( {
      secretOrKey: 'SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },  (token, done) => { 
      this.logger.debug("Here! - token: ", token); 
      done(null, token.user); 
    }));

    this.express.post("/login", passport.authenticate('local', { session: false}), authRoutes.login.bind(authRoutes)); 

  }

  async listen(port?: number) {
    
    this.instance = this.express.listen(port || 0, () => {this.listening = true}); 
    
    let wait = 50; 
    while(!this.listening && wait > 0) { 
      await new Promise((r) => setTimeout(r, 10));
      wait-=10; 
    }
    this.logger.info(`Listening on ${(this.instance.address() as AddressInfo).port}`);
    return this.listening; 

  }

  async close() {
    if(this.instance)
      this.instance.close(); 
  }
}