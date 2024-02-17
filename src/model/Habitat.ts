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

/*export interface IHabitat {
  id?: number;
  name: string;
}*/

export interface HabitatAttributes extends InferAttributes<Habitat> {}
export interface HabitatCreationAttributes
  extends InferCreationAttributes<Habitat> {}
export interface IHabitat extends CreationAttributes<Habitat> {}

export class Habitat extends Model<
  HabitatAttributes,
  HabitatCreationAttributes
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;
}
