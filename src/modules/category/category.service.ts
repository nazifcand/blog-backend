import { Injectable } from '@nestjs/common';
import { Category } from 'src/models/Category.model';

@Injectable()
export class CategoryService {
  getAllCategories() {
    return Category.findAll({ attributes: { exclude: ['userId'] } })
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  getCategoryBySlug(slug: string) {
    return Category.findOne({
      where: { slug },
      attributes: { exclude: ['userId'] },
    })
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  createCategory(data) {
    return Category.create(data)
      .then((res) => [null, res])
      .catch((err) => [err]);
  }

  updateCategoryById(id: number, data) {
    return Category.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deleteCategoryById(id: number): Promise<any> {
    return await Category.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
