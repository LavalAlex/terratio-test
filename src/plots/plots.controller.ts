import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LotsService } from './plots.service';
import { CreateLotDto } from './dto/create-plot.dto';

@Controller('plots')
export class PlotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() body: CreateLotDto) {
    return this.lotsService.createLote(body);
  }

  @Get()
  findAll() {
    return this.lotsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.lotsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLotDto: UpdateLotDto) {
  //   return this.lotsService.update(+id, updateLotDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lotsService.remove(+id);
  // }
}
