import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Side } from '../entities/side.entity';

@Injectable()
export class SideRepository {
  constructor(
    @InjectRepository(Side)
    private readonly _sideRepository: Repository<Side>,
  ) {}

  async create(side: Side[]) {
    return this._sideRepository.save(side);
  }

  async update(side: Side[]) {
    return this._sideRepository.save(side);
  }
}
