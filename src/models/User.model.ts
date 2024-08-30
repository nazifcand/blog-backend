import { Table, Model, Column, Unique, Default } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Unique
  @Column
  username: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Unique
  @Column
  phone: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Default('/default-avatar.svg')
  @Column
  avatar: string;
}
