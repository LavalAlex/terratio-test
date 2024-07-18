import { Injectable } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly _userRepository: UserRepository) {}

  async create() {

    return 'User created successfully.';
  }
}
