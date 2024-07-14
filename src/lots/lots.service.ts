import { Injectable } from '@nestjs/common';

// ** DTO's
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

// ** Repositories.
import { LotRepository } from './repositories/lote.repository';
import { SideRepository } from './repositories/side.repository';

// ** Entities.
import { Lot } from './entities/lot.entity';
import { Side } from './entities/side.entity';

@Injectable()
export class LotsService {
  constructor(
    private readonly _sideRepository: SideRepository,
    private readonly _lotRepository: LotRepository,
  ) {}

  async createLote(body: CreateLotDto) {
    const newLot = {} as Lot;
    newLot.userId = 1;

    const { sides } = body;
    const newSides = sides.map(({ x, y }) => {
      const side = {
        x,
        y,
        lot: newLot,
      } as Side;
      return side;
    }) as Side[];

    newLot.sides = newSides;

    await this._lotRepository.create(newLot);
    await this._sideRepository.create(newSides);

    return newLot;
  }

  findAll() {
    return `This action returns all lots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lot`;
  }

  update(id: number, updateLotDto: UpdateLotDto) {
    return `This action updates a #${id} lot`;
  }

  remove(id: number) {
    return `This action removes a #${id} lot`;
  }
}
