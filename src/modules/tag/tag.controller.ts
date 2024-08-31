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
import { TagService } from './tag.service';
import { Tag } from 'src/models/Tag.model';
import {
  CreateTagValidation,
  UpdateTagValidation,
} from 'src/validations/tag.validation';

@Controller()
export class TagController {
  constructor(readonly tagService: TagService) {}

  @Get('/tags')
  async getTags(): Promise<Tag[]> {
    // get tags
    const [error, tags] = await this.tagService.getAllTags();

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return tags;
  }

  @Get('/tags/:tagSlug')
  async getTag(@Param('tagSlug') tagSlug: string): Promise<Tag> {
    // get tag
    const [error, tag] = await this.tagService.getTagBySlug(tagSlug);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // not found tag
    if (!tag) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return tag;
  }

  @UseGuards(AuthGuard)
  @Post('/tags')
  async createTag(@Req() req, @Body() body: CreateTagValidation): Promise<Tag> {
    const { user } = req;

    // set slug
    body['slug'] = slugify(body.title, { lower: true });

    // set created user id
    body['userId'] = user.id;

    // create tag
    const [error, createdTag] = await this.tagService.createTag(body);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return createdTag;
  }

  @UseGuards(AuthGuard)
  @Put('/tags/:tagId')
  async updateTag(
    @Param('tagId') tagId: string,
    @Body() body: UpdateTagValidation,
    @Req() req,
  ): Promise<Tag> {
    const { user } = req;

    // set slug
    if (body.title) {
      body['slug'] = slugify(body.title, { lower: true });
    }

    // set created user id
    body['userId'] = user.id;

    // update tag
    const [error, updatedTag] = await this.tagService.updateTagById(
      +tagId,
      body,
    );

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // not found tag
    if (!updatedTag) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return updatedTag;
  }

  @UseGuards(AuthGuard)
  @Delete('/tags/:tagId')
  async deleteTag(@Param('tagId') tagId: string): Promise<string> {
    const [error, tag] = await this.tagService.deleteTagById(Number(tagId));

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found tag
    if (!tag) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return tag;
  }
}
