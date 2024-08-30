import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { PostTag } from './PostTag.model';
import { Post } from './Post.model';

@Table({ tableName: 'tags' })
export class Tag extends Model {
  @Column
  title: string;

  @Column
  bgColor: string;

  @Column
  textColor: string;

  @BelongsToMany(() => Post, () => PostTag)
  posts: Post[];
}
