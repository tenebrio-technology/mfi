/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type LogFn = (message?: string, ...optionalParams: any) => void;

export interface IDBLogger {
  data: LogFn;
}

export interface IHttpLogger {
  http: LogFn;
}

export interface ILogger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
  info: LogFn;
  debug: LogFn;
}

export interface IServerLogger extends IDBLogger, IHttpLogger, ILogger {}
