import dotenv from 'dotenv';
import { Dialect, Options } from '@sequelize/core';

const env = (process.env.INSTANCE || '') + '.env';
dotenv.config({ path: env });

export const sequelizeConfig = (): Options => {
  const { db_user, db_pass, db_name, db_host, db_type, db_storage } =
    process.env;

  return {
    dialect: db_type as Dialect,
    username: db_user,
    password: db_pass,
    database: db_name,
    host: db_host,
    storage: db_storage,
  };
};
