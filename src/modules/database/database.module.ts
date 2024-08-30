import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  imports: [],
  controllers: [],
  providers: databaseProviders,
})
export class DatabaseModule {}
