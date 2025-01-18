import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/app/use-cases/create-user.use-case';
import { LoginUserUseCase } from 'src/modules/user/app/use-cases/login-user.use-case';
import { CreateUserDto } from 'src/modules/user/http/dto/create-user.dto';
import { LoginUserDto } from 'src/modules/user/http/dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    this.createUserUseCase.execute(body);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.loginUserUseCase.execute(body);
  }
}
