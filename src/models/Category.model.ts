import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Post } from './Post.model';
import { PostCategory } from './PostCategory.model';
import { User } from './User.model';

@Table({ tableName: 'categories' })
export class Category extends Model {
  @Column
  title: string;

  @Unique
  @Column
  slug: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Post, () => PostCategory)
  posts: Post[];
}
