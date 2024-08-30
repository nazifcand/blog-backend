import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginValidation {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
