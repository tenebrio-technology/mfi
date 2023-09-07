import { Server } from "./server"; 
import { Database } from "./model"; 

import winston  from 'winston';

export * from "./server";  

const logger = winston.createLogger({
  level: 'debug',
  transports: [ new winston.transports.Console({
                      format: winston.format.combine(winston.format.colorize(), 
                      winston.format.simple()), 
  }),
                new winston.transports.File({
                        filename: 'logs/api.log'
                }) ]
});

const storage = new Database({dialect: 'sqlite', storage: ':memory:'}, logger);
const server = new Server(storage, logger); 

server.listen(4000); 