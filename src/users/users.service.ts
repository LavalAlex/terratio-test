import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';
import { encryptedPassword } from './util/password.util';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly _userRepository: UserRepository) {}

  async create(body: CreateUserDto) {
    const { email, password } = body;

    const isUser = await this._userRepository.findOneBy({ email });

    if (isUser) {
      throw new HttpException(
        `Error, There is already a registered user with this email: ${email}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = {
      email,
      password: encryptedPassword(password),
    } as User;

    await this._userRepository.create(newUser);

    return 'User created successfully.';
  }
}
