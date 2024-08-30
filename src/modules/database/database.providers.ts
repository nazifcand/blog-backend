import { Sequelize } from 'sequelize-typescript';
import { Tag } from 'src/models/Tag.model';
import { User } from 'src/models/User.model';
import { Post } from 'src/models/Post.model';
import { PostTag } from 'src/models/PostTag.model';
import { Category } from 'src/models/Category.model';
import { PostCategory } from 'src/models/PostCategory.model';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_PORT,
} from '../../../constants';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
      });
      sequelize.addModels([User, Tag, Post, PostTag, Category, PostCategory]);
      await sequelize.sync({ alter: true, logging: false });
      return sequelize;
    },
  },
];
