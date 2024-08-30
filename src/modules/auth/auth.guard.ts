import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JWT_KEY } from '../../../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // not found token
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_KEY,
      });

      // find user
      const [error, user] = await this.authService.findOneUser({
        id: payload.userId,
        email: payload.email,
      });

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

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
