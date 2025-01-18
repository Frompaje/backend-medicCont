import { Module } from '@nestjs/common';
import { Hasher } from 'src/helper/hasher';
import { PrismaUserRepository } from 'src/modules/user/app/repository/prisma-repostiroy';
import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { CreateUserUseCase } from 'src/modules/user/app/use-cases/create/create-user.use-case';
import { UserController } from 'src/modules/user/http/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    Hasher,
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
