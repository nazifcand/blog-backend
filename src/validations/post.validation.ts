import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostValidation {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  summary: string;

  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  tags: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  categories: number[];
}

export class UpdatePostValidation {
  @IsOptional()
  title: string;

  @IsOptional()
  summary: string;

  @IsOptional()
  thumbnail: string;

  @IsOptional()
  content: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  tags: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  categories: number[];
}
