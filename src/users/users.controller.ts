import { Controller, Post, Body, UsePipes } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post('/')
  @UsePipes(CreateUserDto)
  create(@Body() createUserDto: CreateUserDto) {
    return this._usersService.create(createUserDto);
  }
}
