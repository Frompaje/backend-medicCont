import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { InputCreateUser, User } from 'src/modules/user/types';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create({ name, password, email }: InputCreateUser) {
    await this.prisma.user.create({
      data: {
        name,
        password,
        email,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}
