import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RegisterAuthDTO } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  register(@Body() body: RegisterAuthDTO) {
    return this._authService.register(body);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() body: LoginAuthDto) {
    return this._authService.login(body);
  }
}
