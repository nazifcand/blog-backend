import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagValidation {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  bgColor: string;

  @IsNotEmpty()
  textColor: string;
}

export class UpdateTagValidation {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  bgColor: string;

  @IsOptional()
  @IsNotEmpty()
  textColor: string;
}
