import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  CreationAttributes,
} from '@sequelize/core';
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
} from '@sequelize/core/decorators-legacy';

/*
export interface IUser {
  id: number;
  username: string;
}*/

export interface UserAttributes extends InferAttributes<User> {}
export interface UserCreationAttributes extends InferCreationAttributes<User> {}
export interface IUser extends CreationAttributes<User> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements IUser
{
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare username: string;

  @Attribute(DataTypes.STRING)
  declare password: CreationOptional<string | null>;
}
