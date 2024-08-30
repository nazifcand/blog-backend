import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Post } from './Post.model';
import { Tag } from './Tag.model';

@Table({ tableName: 'postTags' })
export class PostTag extends Model {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}
