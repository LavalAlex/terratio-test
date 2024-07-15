import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PlotsController } from './plots.controller';
import { PlotsService } from './plots.service';

import { SideRepository } from './repositories/side.repository';
import { PlotRepository } from './repositories/plots.repository';

import { Side } from './entities/side.entity';
import { Plot } from './entities/plots.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plot, Side])],
  controllers: [PlotsController],
  providers: [PlotsService, SideRepository, PlotRepository],
})
export class LotsModule {}
