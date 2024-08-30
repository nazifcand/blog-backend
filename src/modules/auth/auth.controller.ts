import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginValidation } from 'src/validations/login.validation';
import textToHash from 'src/utils/textToHash';
import { RegisterValidation } from 'src/validations/register.validation';
import { User } from 'src/models/User.model';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginValidation): Promise<{ token: string }> {
    body['password'] = textToHash(body.password);

    const { email, password } = body;

    // find user
    const [error, user] = await this.authService.findOneUser({
      email,
      password,
    });

    // is error
    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found user
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    // generate token
    const token = await this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
    });

    return { token };
  }

  @Post('/register')
  async register(@Body() body: RegisterValidation): Promise<User> {
    // hash password
    body.password = textToHash(body.password);

    // create user
    const [error, createdUser] = await this.authService.register(body);

    // is error
    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // return created user
    return createdUser;
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  fetchMe(@Req() req): User {
    // not found user
    if (!req.user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return req.user;
  }
}
