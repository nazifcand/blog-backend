import { Injectable } from '@nestjs/common';
import { User } from 'src/models/User.model';

@Injectable()
export class AuthService {
  async findOneUser(where): Promise<any> {
    return User.findOne({
      where,
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async register(data): Promise<any> {
    return User.create(data)
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
