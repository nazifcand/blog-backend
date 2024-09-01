import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Post } from './Post.model';
import { Category } from './Category.model';

@Table({ tableName: 'postCategories', timestamps: false })
export class PostCategory extends Model {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}
