import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Plot } from '../entities/plots.entity';

@Injectable()
export class PlotRepository {
  constructor(
    @InjectRepository(Plot)
    private readonly _plotRepository: Repository<Plot>,
  ) {}

  async create(Plot: Plot) {
    return this._plotRepository.save(Plot);
  }

  async find() {
    return this._plotRepository.find({ relations: { sides: true } });
  }

  async findOneBy(id: number) {
    return this._plotRepository.findOne({
      where: { id },
      relations: { sides: true },
    });
  }

  async delete(id: number) {
    return this._plotRepository.delete(id);
  }

  async update(plot: Plot) {
    return this._plotRepository.save(plot);
  }
}
