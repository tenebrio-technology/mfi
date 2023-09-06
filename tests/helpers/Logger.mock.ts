import { IServerLogger } from "../../src/types/types"; 

export class MockLogger implements IServerLogger { 

  buffer: string[] = []; 
  info  = this.store; 
  http  = this.store; 
  log   = this.store; 
  warn  = this.store; 
  error = this.store; 
  data  = this.store; 
  debug = this.store; 

  store(msg: string) { 
    this.buffer.push(msg); 
  }

  last(count? : number) { 
    const start = count ? this.buffer.length  - count : 0;  
    return this.buffer.slice(start, this.buffer.length).join('\n'); 
  }

  first(count?: number) { 
    return this.buffer.slice(0, count).join('\n'); 
  }

  item(index: number) { 
    return this.buffer[index] + "\n"; 
  }
}