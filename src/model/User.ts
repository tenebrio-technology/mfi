import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript';

export interface IUser { 
  id: number; 
  username: string; 
}

@Table
export class User extends Model implements IUser { 

    @PrimaryKey @Column
    declare id: number; 

    @Column 
    declare username: string;

    @Column
    declare password: string;
}

