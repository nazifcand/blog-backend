import { Injectable } from '@nestjs/common';
import { Category } from 'src/models/Category.model';
import { Post } from 'src/models/Post.model';
import { Tag } from 'src/models/Tag.model';

@Injectable()
export class PostService {
  getAllPosts() {
    return Post.findAll({
      attributes: { exclude: ['userId'] },
      include: [
        {
          as: 'tags',
          model: Tag,
          attributes: { exclude: ['userId'] },
          through: { attributes: [] },
        },
        {
          as: 'categories',
          model: Category,
          attributes: { exclude: ['userId'] },
          through: { attributes: [] },
        },
      ],
    })
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  getPostBySlug(slug: string) {
    return Post.findOne({
      where: { slug },
      attributes: { exclude: ['userId'] },
      include: [
        {
          as: 'tags',
          model: Tag,
          attributes: { exclude: ['userId'] },
          through: { attributes: [] },
        },
        {
          as: 'categories',
          model: Category,
          attributes: { exclude: ['userId'] },
          through: { attributes: [] },
        },
      ],
    })
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  createPost(data) {
    return Post.create(data)
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  updatePostById(id: number, data) {
    return Post.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deletePostById(id: number): Promise<any> {
    return await Post.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
