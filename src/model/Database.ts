
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'; 
import { User } from '.';
import { SyncOptions } from 'sequelize';
import { IDBLogger } from '../types/types';

export class Database extends Sequelize { 

  // Created a database instance, and runs 'sync()' (creates the database) if 
  // sync is true
  static async connect(options: SequelizeOptions, logger?: IDBLogger) {
     return new Database({...options, logging: logger.data.bind(logger)}); 
  }

  constructor(options: SequelizeOptions, logger?: IDBLogger) {
    super({ ...options, models: [User] }); 
  }

  async build(options?: SyncOptions)  { 
    await this.sync(options); 
  }

}

