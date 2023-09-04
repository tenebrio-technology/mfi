
import express from 'express';

export class Server { 

  constructor(port) { 

    this.port = port || 4000;   
    this.framework = express(); 
    this.framework.get("/", (req, res) => res.send("Hello World!")); 
  }

  run() {
    this.instance = this.framework.listen(this.port, () => console.log(`Listening on port ${this.port}`));
  }

}