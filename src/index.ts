import { Server } from './server';
import { Database } from './model';
import { sequelizeConfig } from "./config"; 

import winston from 'winston';

export * from './server';

const logger = winston.createLogger({
  level: 'debug',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    data: 3,
    http: 4,
    verbose: 5,
    debug: 6,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/api.log',
    }),
  ],
});
const storage = new Database(sequelizeConfig(), logger);
//storage.build({alter: true}); 
const server = new Server(storage, logger);

server.listen(4000);
