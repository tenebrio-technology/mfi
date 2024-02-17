import { AuthService, HabitatService } from '.';
import { Database } from '../model';
import { IServerLogger } from '../types/types';

export class Services {
  auth: AuthService;
  habitat: HabitatService;

  constructor(storage: Database, logger: IServerLogger) {
    this.auth = new AuthService(this, storage, logger);
    this.habitat = new HabitatService(this, storage, logger);
  }
}
