import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PlotsController } from './plots.controller';
import { LotsService } from './plots.service';

import { SideRepository } from './repositories/side.repository';
import { LotRepository } from './repositories/plots.repository';

import { Side } from './entities/side.entity';
import { Plot } from './entities/plots.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plot, Side])],
  controllers: [PlotsController],
  providers: [LotsService, SideRepository, LotRepository],
})
export class LotsModule {}
