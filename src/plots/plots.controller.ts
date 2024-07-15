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
  constructor(private readonly plotsService: PlotsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() body: CreatePlotDto) {
    return this.plotsService.createLote(body);
  }

  @Get()
  findAll() {
    return this.plotsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plotsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.plotsService.delete(id);
  }

  @Put()
  @UsePipes(ValidationPipe)
  update(@Body() body: UpdatePlotDto) {
    return this.plotsService.update(body);
  }
}
