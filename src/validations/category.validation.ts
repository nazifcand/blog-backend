import { IsNotEmpty } from 'class-validator';

export class CreateCategoryValidation {
  @IsNotEmpty()
  title: string;
}

export class UpdateCategoryValidation {
  @IsNotEmpty()
  title: string;
}
