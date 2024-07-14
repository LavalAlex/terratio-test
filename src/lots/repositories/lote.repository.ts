import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Lot } from '../entities/lot.entity';

@Injectable()
export class LotRepository {
  constructor(
    @InjectRepository(Lot)
    private readonly _lotRepository: Repository<Lot>,
  ) {}

  async create(lot: Lot): Promise<Lot> {
    return this._lotRepository.save(lot);
  }
}
