import http from 'http';
import { AddressInfo } from 'net';
import express, { Express } from 'express';
import morgan from 'morgan';
import Cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { IServerLogger } from './types/types';
import { Services } from './services';
import { Database } from './model';
import { Routes } from './routes';

export class Server {
  port: number;
  listening: boolean = false;
  express: Express;
  logger?: IServerLogger;
  instance?: http.Server;
  address?: AddressInfo;
  services: Services;
  routes: Routes;

  constructor(storage: Database, logger?: IServerLogger) {
    this.express = express();

    this.logger = this.initializeLogging(logger);
    this.logger.info('Tenebrio API Server');

    this.services = new Services(storage, this.logger);
    this.initializeSecurity();

    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());

    this.express.use(Cors());

    this.routes = new Routes('/', this.services, this.logger);
    this.express.use(this.routes.router());
  }

  initializeLogging(logger?: IServerLogger): IServerLogger {
    logger = logger || {
      log: console.log,
      data: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      http: console.info,
      debug: console.debug,
    };

    const stream = { write: (msg: string) => logger.http(msg) };
    this.express.use(
      morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream,
      }),
    );
    return logger;
  }

  initializeSecurity(): void {
    this.express.use(passport.initialize());
    passport.serializeUser(
      this.services.auth.serializeUser.bind(this.services.auth),
    );
    passport.deserializeUser(
      this.services.auth.deserializeUser.bind(this.services.auth),
    );

    passport.use(
      new LocalStrategy(
        { session: false },
        this.services.auth.localStrategy.bind(this.services.auth),
      ),
    );
    passport.use(
      new JwtStrategy(
        {
          secretOrKey: 'SECRET',
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        (token, done) => {
          done(null, token.user);
        },
      ),
    );
  }

  async listen(port?: number): Promise<boolean> {
    this.instance = this.express.listen(port || 0, () => {
      this.listening = true;
    });

    let wait = 50;
    while (!this.listening && wait > 0) {
      await new Promise((r) => setTimeout(r, 10));
      wait -= 10;
    }

    if (!this.listening) this.logger.error(`Failed to attach to port`);
    else
      this.logger.info(
        `Listening on ${(this.instance.address() as AddressInfo).port}`,
      );
    return this.listening;
  }

  async close(): Promise<void> {
    if (this.instance) this.instance.close();
  }
}
