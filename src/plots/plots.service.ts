// ** Import Dependencies.
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// ** DTO's and Interface.
import { CreatePlotDto, UpdatePlotDto } from './dto/plot.dto';
import { IUserCredentials } from './interface/user.interface';

// ** Repositories.
import { UserRepository } from 'src/users/repository/user.repository';
import { PlotRepository } from './repositories/plots.repository';
import { SideRepository } from './repositories/side.repository';

// ** Entities.
import { Plot } from './entities/plots.entity';
import { Side } from './entities/side.entity';

// ** Utils
import { sidesIntersect } from './utils/intersect.util';
import { consecutive } from './utils/consecutive.util';

@Injectable()
export class PlotsService {
  constructor(
    private readonly _sideRepository: SideRepository,
    private readonly _plotRepository: PlotRepository,
    private readonly _userRepository: UserRepository,
  ) {}

  private async validateUser(userCredentials: IUserCredentials) {
    const { email } = userCredentials;
    const isUser = await this._userRepository.findOneBy({ email });

    if (!isUser) {
      throw new HttpException(
        `Error, There is no user registered with this email: ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return isUser;
  }

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

  async createLote(userCredentials: IUserCredentials, body: CreatePlotDto) {
    const { sides, reference } = body;
    const totalSides = sides.length;

    // ** Validations.
    const user = await this.validateUser(userCredentials);

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
      user,
    } as Plot;

    await this._plotRepository.create(newLot);
    await this._sideRepository.create(newSides);

    return `Total: ${newLot.total}`;
  }

  async findAll(userCredentials: IUserCredentials) {
    const user = await this.validateUser(userCredentials);
    return this._plotRepository.find(user.id);
  }

  async findOne(userCredentials: IUserCredentials, id: number) {
    const user = await this.validateUser(userCredentials);
    const isPlot = await this._plotRepository.findOneBy(id);

    if (!isPlot) {
      throw new HttpException(
        `Error, There is no plot created with id: ${id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!isPlot.user || isPlot.user.id !== user.id) {
      throw new HttpException(
        `Error, You cannot select a plot that does not belong to you`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return isPlot;
  }

  async update(userCredentials: IUserCredentials, body: UpdatePlotDto) {
    const { id, sides, reference } = body;

    // ** Validations.
    const isPlot = await this.validatePlot(id);
    const user = await this.validateUser(userCredentials);

    if (!isPlot.user || isPlot.user.id !== user.id) {
      throw new HttpException(
        'Error, Cannot update a batch that does not belong to you.',
        HttpStatus.BAD_REQUEST,
      );
    }

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

  async delete(userCredentials: IUserCredentials, id: number) {
    const isPlot = await this.validatePlot(id);

    const user = await this.validateUser(userCredentials);

    if (!isPlot.user || isPlot.user.id !== user.id) {
      throw new HttpException(
        'Error, Cannot delete a batch that does not belong to you.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._plotRepository.delete(id);

    return `The Plot ${id} was successfully deleted.`;
  }
}
