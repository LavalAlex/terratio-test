import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Plot } from '../entities/plots.entity';

@Injectable()
export class LotRepository {
  constructor(
    @InjectRepository(Plot)
    private readonly _plotRepository: Repository<Plot>,
  ) {}

  async create(Plot: Plot): Promise<Plot> {
    return this._plotRepository.save(Plot);
  }

  async find() {
    return this._plotRepository.find();
  }

  async findOneBy(id: number) {
    return this._plotRepository.findOneBy({ id });
  }
}
