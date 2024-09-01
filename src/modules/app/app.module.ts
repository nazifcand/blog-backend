import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [DatabaseModule, AuthModule, CategoryModule, TagModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
