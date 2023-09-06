import { Server } from './server'; 
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

let server = new Server(logger); 
server.listen(4000); 