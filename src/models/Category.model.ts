import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Post } from './Post.model';
import { PostCategory } from './PostCategory.model';

@Table({ tableName: 'categories' })
export class Category extends Model {
  @Column
  title: string;

  @Column
  slug: string;

  @BelongsToMany(() => Post, () => PostCategory)
  posts: Post[];
}
