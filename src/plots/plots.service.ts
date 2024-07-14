import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// ** DTO's
import { CreateLotDto } from './dto/create-plot.dto';

// ** Repositories.
import { LotRepository } from './repositories/plots.repository';
import { SideRepository } from './repositories/side.repository';

// ** Entities.
import { Plot } from './entities/plots.entity';
import { Side } from './entities/side.entity';

@Injectable()
export class LotsService {
  constructor(
    private readonly _sideRepository: SideRepository,
    private readonly _lotRepository: LotRepository,
  ) {}

  async createLote(body: CreateLotDto) {
    const { sides, reference } = body;

    const totalSides = sides.length;
    if (totalSides < 3) {
      throw new HttpException(
        'Error, you need at least 3 sides to be able to calculate the lot area.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let area = 0;
    const newSides: Side[] = [];

    for (let i = 0; i < totalSides; i++) {
      const { x: x1, y: y1 } = sides[i];
      const { x: x2, y: y2 } = sides[(i + 1) % totalSides];
      area += x1 * y2 - y1 * x2;

      const side = {
        x: sides[i].x,
        y: sides[i].y,
      } as Side;
      newSides.push(side);
    }

    const newLot = {
      userId: 1,
      total: Math.abs(area) / 2,
      sides: newSides,
      reference,
    } as Plot;

    await this._lotRepository.create(newLot);
    await this._sideRepository.create(newSides);

    return `Total: ${newLot.total}`;
  }

  async findAll() {
    return this._lotRepository.find();
  }

  async findOne(id: number) {
    const isLot = await this._lotRepository.findOneBy(id);

    if (!isLot) {
      throw new HttpException(
        `Error, There is no lot created with id: ${id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return isLot;
  }

  // update(id: number, updateLotDto: UpdateLotDto) {
  //   return `This action updates a #${id} lot`;
  // }

  remove(id: number) {
    return `This action removes a #${id} lot`;
  }
}
