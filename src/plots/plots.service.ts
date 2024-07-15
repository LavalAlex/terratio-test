import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// ** DTO's
import { CreatePlotDto, UpdatePlotDto } from './dto/plot.dto';

// ** Repositories.
import { PlotRepository } from './repositories/plots.repository';
import { SideRepository } from './repositories/side.repository';

// ** Entities.
import { Plot } from './entities/plots.entity';
import { Side } from './entities/side.entity';
import { CreateSideDto } from './dto/side.dto';

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

  private consecutive(sides: CreateSideDto[]): boolean {
    for (let i = 0; i < sides.length - 1; i++) {
      const startPoint = { x: sides[i].x1, y: sides[i].y1 };
      const endPoint = { x: sides[i + 1].x0, y: sides[i + 1].y0 };

      if (startPoint.x !== endPoint.x || startPoint.y !== endPoint.y) {
        return false;
      }
    }
    const lastPoint = {
      x: sides[sides.length - 1].x1,
      y: sides[sides.length - 1].y1,
    };
    const firstPoint = { x: sides[0].x0, y: sides[0].y0 };

    if (lastPoint.x !== firstPoint.x || lastPoint.y !== firstPoint.y) {
      return false;
    }

    return true;
  }

  private sidesIntersect(sides: CreateSideDto[]): boolean {
    const n = sides.length;
    for (let i = 0; i < n; i++) {
      const a = { x: sides[i].x0, y: sides[i].y0 };
      const b = { x: sides[i].x1, y: sides[i].y1 };

      for (let j = i + 2; j < n; j++) {
        if (i === 0 && j === n - 1) continue;

        const c = { x: sides[j].x0, y: sides[j].y0 };
        const d = { x: sides[j].x1, y: sides[j].y1 };

        if (this.intersect(a, b, c, d)) return true;
      }
    }

    return false;
  }

  private onSegment(
    p: { x: number; y: number },
    q: { x: number; y: number },
    r: { x: number; y: number },
  ) {
    if (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    ) {
      return true;
    }
    return false;
  }

  private orientation(
    p: { x: number; y: number },
    q: { x: number; y: number },
    r: { x: number; y: number },
  ) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return val > 0 ? 1 : 2;
  }

  private intersect(
    p1: { x: number; y: number },
    q1: { x: number; y: number },
    p2: { x: number; y: number },
    q2: { x: number; y: number },
  ) {
    const o1 = this.orientation(p1, q1, p2);
    const o2 = this.orientation(p1, q1, q2);
    const o3 = this.orientation(p2, q2, p1);
    const o4 = this.orientation(p2, q2, q1);
    if (o1 !== o2 && o3 !== o4) {
      return true;
    }

    if (o1 === 0 && this.onSegment(p1, p2, q1)) return true;
    if (o2 === 0 && this.onSegment(p1, q2, q1)) return true;
    if (o3 === 0 && this.onSegment(p2, p1, q2)) return true;
    if (o4 === 0 && this.onSegment(p2, q1, q2)) return true;

    return false;
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

    if (!this.consecutive(sides)) {
      throw new HttpException(
        'Error, the points provided are not consecutive.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.sidesIntersect(sides)) {
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

    if (!this.consecutive(sides)) {
      throw new HttpException(
        'Error, the points provided are not consecutive.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.sidesIntersect(sides)) {
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
