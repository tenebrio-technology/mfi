import { Server } from './server'; 

export * from "./server";  

let server = new Server(4000); 

server.run(); 