import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterAuthDTO } from './dto/register-auth.dto';
import { UserRepository } from 'src/users/repository/user.repository';
import { decryptionPassword, encryptedPassword } from './util/password.util';
import { User } from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private _jwtService: JwtService,
  ) {}

  async register(body: RegisterAuthDTO) {
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

  async login(body: LoginAuthDto) {
    const { email, password } = body;
    const isUser = await this._userRepository.findOneBy({ email });

    if (!isUser) {
      throw new HttpException(
        `Error, There is no user registered with this email: ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPassword = await decryptionPassword(password, isUser.password);
    if (!isPassword) {
      throw new HttpException(
        `Incorrect password or email!`,
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = { id: isUser.id, email: isUser.email };
    const token = await this._jwtService.sign(payload);

    const data = {
      email,
      token,
    };

    return data;
  }
}
