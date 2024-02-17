import { Sequelize, Options, SyncOptions } from '@sequelize/core';
import { User, Habitat } from '.';
import { IDBLogger } from '../types/types';

export class Database extends Sequelize {
  static connect(options: Options, logger?: IDBLogger): Database {
    return new Database({ ...options }, logger);
  }

  constructor(options: Options, logger: IDBLogger) {
    super({
      ...options,
      logging: logger.data.bind(logger),
      models: [User, Habitat],
    });
  }

  async build(options: SyncOptions): Promise<void> {
    await this.sync(options);
  }
}
