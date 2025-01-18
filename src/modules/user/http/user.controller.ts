import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/app/use-cases/create/create-user.use-case';
import { CreateUserDto } from 'src/modules/user/http/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    this.createUserUseCase.execute(body);
  }
}
