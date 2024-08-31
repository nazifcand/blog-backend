import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import slugify from 'slugify';
import {
  CreateCategoryValidation,
  UpdateCategoryValidation,
} from 'src/validations/category.validation';
import { CategoryService } from './category.service';
import { Category } from 'src/models/Category.model';

@Controller()
export class CategoryController {
  constructor(readonly categoryService: CategoryService) {}

  @Get('/categories')
  async getCategories(): Promise<Category[]> {
    // get categories
    const [error, categories] = await this.categoryService.getAllCategories();

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return categories;
  }

  @Get('/categories/:categorySlug')
  async getCategory(
    @Param('categorySlug') categorySlug: string,
  ): Promise<Category> {
    // get categories
    const [error, category] =
      await this.categoryService.getCategoryBySlug(categorySlug);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // not found category
    if (!category) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  @UseGuards(AuthGuard)
  @Post('/categories')
  async createCategory(
    @Req() req,
    @Body() body: CreateCategoryValidation,
  ): Promise<Category> {
    const { user } = req;

    // set slug
    body['slug'] = slugify(body.title, { lower: true });

    // set created user id
    body['userId'] = user.id;

    // create category
    const [error, createCategory] =
      await this.categoryService.createCategory(body);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return createCategory;
  }

  @UseGuards(AuthGuard)
  @Put('/categories/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryValidation,
    @Req() req,
  ): Promise<Category> {
    const { user } = req;

    // set slug
    if (body.title) {
      body['slug'] = slugify(body.title, { lower: true });
    }

    // set created user id
    body['userId'] = user.id;

    // update category
    const [error, updatedCategory] =
      await this.categoryService.updateCategoryById(+categoryId, body);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return updatedCategory;
  }

  @UseGuards(AuthGuard)
  @Delete('/categories/:categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<string> {
    const [error, organization] = await this.categoryService.deleteCategoryById(
      Number(categoryId),
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found organization
    if (!organization) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return organization;
  }
}
