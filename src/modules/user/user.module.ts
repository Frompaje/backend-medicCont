import { Module } from '@nestjs/common';
import { Hasher } from 'src/helper/hasher';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from 'src/modules/user/app/repository/prisma-repostiry';
import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { CreateUserUseCase } from 'src/modules/user/app/use-cases/create-user.use-case';
import { LoginUserUseCase } from 'src/modules/user/app/use-cases/login-user.use-case';
import { UserController } from 'src/modules/user/http/user.controller';
import { TokenGenerate } from 'src/helper/tokenGenerate';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    Hasher,
    TokenGenerate,
    CreateUserUseCase,
    LoginUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    JwtService,
    ConfigService,
  ],
})
export class UserModule {}
