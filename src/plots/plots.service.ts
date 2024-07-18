import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// ** DTO's
import { CreatePlotDto, UpdatePlotDto } from './dto/plot.dto';

// ** Repositories.
import { PlotRepository } from './repositories/plots.repository';
import { SideRepository } from './repositories/side.repository';

// ** Entities.
import { Plot } from './entities/plots.entity';
import { Side } from './entities/side.entity';

// ** Utils
import { consecutive } from './utils/consecutive.util';
import { sidesIntersect } from './utils/intersect.util';

@Injectable()
export class PlotsService {
  constructor(
    private readonly _sideRepository: SideRepository,
    private readonly _plotRepository: PlotRepository,
  ) {}

  private async validatePlot(id: number) {
    const isLot = await this._plotRepository.findOneBy(id);

    if (!isLot) {
      throw new HttpException(
        `Error, There is no plot created with id: ${id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return isLot;
  }

  async createLote(body: CreatePlotDto) {
    const { sides, reference } = body;

    const totalSides = sides.length;

    // ** Validations.
    if (totalSides < 3) {
      throw new HttpException(
        'Error, you need at least 3 sides to be able to calculate the lot area.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (consecutive(sides)) {
      throw new HttpException(
        'Error, the points provided are not consecutive.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (sidesIntersect(sides)) {
      throw new HttpException(
        'Error, the points provided are colineales.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let area = 0;
    const newSides: Side[] = [];

    for (let i = 0; i < totalSides; i++) {
      const { x0, y0, x1, y1 } = sides[i];
      area += x0 * y1 - y0 * x1;

      const side = {
        x0,
        y0,
        x1,
        y1,
      } as Side;

      newSides.push(side);
    }

    const newLot = {
      total: Math.abs(area) / 2,
      sides: newSides,
      reference,
    } as Plot;

    await this._plotRepository.create(newLot);
    await this._sideRepository.create(newSides);

    return `Total: ${newLot.total}`;
  }

  async findAll() {
    return this._plotRepository.find();
  }

  async findOne(id: number) {
    const isLot = await this._plotRepository.findOneBy(id);

    if (!isLot) {
      throw new HttpException(
        `Error, There is no plot created with id: ${id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return isLot;
  }

  async update(body: UpdatePlotDto) {
    const { id, sides, reference } = body;

    // ** Validations.
    const isPlot = await this.validatePlot(id);

    // ** Side Validations.
    const totalSides = sides.length;
    if (totalSides < 3) {
      throw new HttpException(
        'Error, you need at least 3 sides to be able to calculate the lot area.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!consecutive(sides)) {
      throw new HttpException(
        'Error, the points provided are not consecutive.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (sidesIntersect(sides)) {
      throw new HttpException(
        'Error, the points provided are colineales.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const ids = [] as number[];

    sides.forEach((side) => {
      const isSide = isPlot.sides.some(({ id }) => id === side.id);

      if (!isSide) {
        throw new HttpException(
          `Error, There is no side created with id: ${side.id}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const isIds = ids.some((id) => id === side.id);

      if (isIds) {
        throw new HttpException(
          `Error, Cannot send repeated ids: ${side.id}.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      ids.push(side.id);
    });

    // ** Update.
    let area = 0;
    const updateSides = [] as Side[];

    for (let i = 0; i < totalSides; i++) {
      const { x0, y0, x1, y1, ...sideProps } = sides[i];
      area += x0 * y1 - y0 * x1;

      const side = {
        ...sideProps,
        x0,
        y0,
        x1,
        y1,
      } as Side;
      updateSides.push(side);
    }

    isPlot.total = Math.abs(area) / 2;

    if (reference) {
      isPlot.reference = reference;
    }

    await this._plotRepository.update(isPlot);
    await this._sideRepository.update(updateSides);

    return `This plot #${id} was successfully updated.`;
  }

  async delete(id: number) {
    await this.validatePlot(id);

    await this._plotRepository.delete(id);

    return `The Plot ${id} was successfully deleted.`;
  }
}
