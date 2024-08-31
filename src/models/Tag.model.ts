import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { PostTag } from './PostTag.model';
import { Post } from './Post.model';
import { User } from './User.model';

@Table({ tableName: 'tags' })
export class Tag extends Model {
  @Column
  title: string;

  @Unique
  @Column
  slug: string;

  @Column
  bgColor: string;

  @Column
  textColor: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  users: User[];

  @BelongsToMany(() => Post, () => PostTag)
  posts: Post[];
}
