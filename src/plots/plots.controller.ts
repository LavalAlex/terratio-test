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
} from '@nestjs/common';

import { PlotsService } from './plots.service';
import { CreatePlotDto, UpdatePlotDto } from './dto/plot.dto';

@Controller('plots')
export class PlotsController {
  constructor(private readonly _plotsService: PlotsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() body: CreatePlotDto) {
    return this._plotsService.createLote(body);
  }

  @Get()
  findAll() {
    return this._plotsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this._plotsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this._plotsService.delete(id);
  }

  @Put()
  @UsePipes(ValidationPipe)
  update(@Body() body: UpdatePlotDto) {
    return this._plotsService.update(body);
  }
}
