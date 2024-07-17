import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';
import { Plot } from 'src/plots/entities/plots.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plot, User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
