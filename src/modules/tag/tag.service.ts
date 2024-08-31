import { Injectable } from '@nestjs/common';
import { Tag } from 'src/models/Tag.model';

@Injectable()
export class TagService {
  getAllTags() {
    return Tag.findAll({ attributes: { exclude: ['userId'] } })
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  getTagBySlug(slug: string) {
    return Tag.findOne({
      where: { slug },
      attributes: { exclude: ['userId'] },
    })
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  createTag(data) {
    return Tag.create(data)
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  updateTagById(id: number, data) {
    return Tag.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deleteTagById(id: number): Promise<any> {
    return await Tag.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
