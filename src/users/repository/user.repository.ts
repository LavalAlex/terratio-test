import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { IParams } from '../interface/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async create(user: User) {
    return this._userRepository.save(user);
  }

  async findOneBy(param: IParams) {
    return this._userRepository.findOneBy({ ...param });
  }
}
