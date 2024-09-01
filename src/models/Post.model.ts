import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './User.model';
import { Tag } from './Tag.model';
import { PostTag } from './PostTag.model';
import { Category } from './Category.model';
import { PostCategory } from './PostCategory.model';

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column
  title: string;

  @Column
  slug: string;

  @Column
  summary: string;

  @Column
  thumbnail: string;

  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => PostTag)
  tags: Tag[];

  @BelongsToMany(() => Category, () => PostCategory)
  categories: Category[];
}
