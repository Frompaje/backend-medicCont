import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { InputCreateUser } from 'src/modules/user/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Hasher } from 'src/helper/hasher';
import { logger } from 'src/infra/logger';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
  ) {}
  async execute({ name, email, password }: InputCreateUser) {
    if (!name || !email || !password) {
      logger.error('[ERROR-001] Dados invalidos');
      throw new BadRequestException();
    }

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      logger.error('[ERROR-002] Credenciais Inválidas');
      throw new BadRequestException();
    }

    const passwordHashed = await this.hasher.hash(password);

    logger.info('[Usecase] Usuário criado ');
    await this.userRepository.create({
      name,
      password: passwordHashed,
      email,
    });
  }
}
