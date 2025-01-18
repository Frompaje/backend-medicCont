import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { InputLoginUser } from 'src/modules/user/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Hasher } from 'src/helper/hasher';
import { logger } from 'src/infra/logger';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly hasher: Hasher,
  ) {}

  async execute({ email, password }: InputLoginUser) {
    if (!email || !password) {
      logger.info('[ERROR-001] Dados invalidos');

      throw new BadRequestException('Dados Inválidas');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      logger.info('[ERROR-002] Credenciais Inválidas');

      throw new BadRequestException('Credenciais Inválidas');
    }

    const isSamePassword = await this.hasher.compare(password, user.password);

    if (!isSamePassword) {
      logger.info('[ERROR-002] Credenciais Inválidas');
      throw new BadRequestException('Credenciais Inválidas');
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    const jwt = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    logger.info('Usuário logado');

    return {
      accesToken: jwt,
    };
  }
}
