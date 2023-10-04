import { IServerLogger } from '../../src/types/types';

export class MockLogger implements IServerLogger {
  buffer: string[] = [];
  info = (msg): void => this.store('info: ' + msg);
  http = (msg): void => this.store('http: ' + msg);
  log = (msg): void => this.store('log: ' + msg);
  warn = (msg): void => this.store('warn: ' + msg);
  error = (msg): void => this.store('error: ' + msg);
  data = (msg): void => this.store('data: ' + msg);
  debug = (msg): void => this.store('debuga: ' + msg);

  store(msg: string): void {
    this.buffer.push(msg);
  }

  last(count?: number): string {
    const start = count ? this.buffer.length - count : 0;
    return this.buffer.slice(start, this.buffer.length).join('\n');
  }

  first(count?: number): string {
    return this.buffer.slice(0, count).join('\n');
  }

  item(index: number): string {
    return this.buffer[index] + '\n';
  }
}
