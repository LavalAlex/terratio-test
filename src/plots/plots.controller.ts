import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreatePlotDto, UpdatePlotDto } from './dto/plot.dto';
import { IUserCredentials } from './interface/user.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { PlotsService } from './plots.service';

@Controller('plots')
@UseGuards(AuthGuard)
export class PlotsController {
  constructor(private readonly _plotsService: PlotsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() body: CreatePlotDto, @Request() request: Request) {
    const userCredentials = request[
      'credentials'
    ] as unknown as IUserCredentials;

    return this._plotsService.createLote(userCredentials, body);
  }

  @Get()
  findAll(@Request() request: Request) {
    const userCredentials = request[
      'credentials'
    ] as unknown as IUserCredentials;

    return this._plotsService.findAll(userCredentials);
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() request: Request) {
    const userCredentials = request[
      'credentials'
    ] as unknown as IUserCredentials;

    return this._plotsService.findOne(userCredentials, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() request: Request) {
    const userCredentials = request[
      'credentials'
    ] as unknown as IUserCredentials;

    return this._plotsService.delete(userCredentials, id);
  }

  @Put()
  @UsePipes(ValidationPipe)
  update(@Body() body: UpdatePlotDto, @Request() request: Request) {
    const userCredentials = request[
      'credentials'
    ] as unknown as IUserCredentials;

    return this._plotsService.update(userCredentials, body);
  }
}
