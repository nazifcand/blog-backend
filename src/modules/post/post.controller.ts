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
import { PostService } from './post.service';
import { Post as PostModel } from 'src/models/Post.model';
import {
  CreatePostValidation,
  UpdatePostValidation,
} from 'src/validations/post.validation';

@Controller()
export class PostController {
  constructor(readonly postService: PostService) {}

  @Get('/posts')
  async getPosts(): Promise<PostModel[]> {
    // get posts
    const [error, posts] = await this.postService.getAllPosts();

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return posts;
  }

  @Get('/posts/:postSlug')
  async getPost(@Param('postSlug') postSlug: string): Promise<PostModel> {
    // get post
    const [error, post] = await this.postService.getPostBySlug(postSlug);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // not found post
    if (!post) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  @UseGuards(AuthGuard)
  @Post('/posts')
  async createPost(
    @Req() req,
    @Body() body: CreatePostValidation,
  ): Promise<PostModel> {
    const { user } = req;

    // set slug
    body['slug'] = slugify(body.title, { lower: true });

    // set created user id
    body['userId'] = user.id;

    // create post
    const [error, post] = await this.postService.createPost(body);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // set categories
    post.$set('categories', body.categories);

    // set tags
    post.$set('tags', body.tags);

    return post;
  }

  @UseGuards(AuthGuard)
  @Put('/posts/:postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body() body: UpdatePostValidation,
    @Req() req,
  ): Promise<PostModel> {
    const { user } = req;

    // set slug
    if (body.title) {
      body['slug'] = slugify(body.title, { lower: true });
    }

    // set created user id
    body['userId'] = user.id;

    // update post
    const [error, post] = await this.postService.updatePostById(+postId, body);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // not found post
    if (!post) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    // set categories
    if (body?.categories?.length > 0) {
      post.$set('categories', body.categories);
    }
    // set tags
    if (body?.tags?.length > 0) {
      post.$set('tags', body.tags);
    }

    return post;
  }

  @UseGuards(AuthGuard)
  @Delete('/posts/:postId')
  async deletePost(@Param('postId') postId: string): Promise<string> {
    const [error, post] = await this.postService.deletePostById(Number(postId));

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found post
    if (!post) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return post;
  }
}
