import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PlotsController } from './plots.controller';
import { PlotsService } from './plots.service';

import { SideRepository } from './repositories/side.repository';
import { PlotRepository } from './repositories/plots.repository';

import { User } from 'src/users/entities/user.entity';
import { Plot } from './entities/plots.entity';
import { Side } from './entities/side.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plot, Side, User])],
  controllers: [PlotsController],
  providers: [PlotsService, SideRepository, PlotRepository],
})
export class LotsModule {}
