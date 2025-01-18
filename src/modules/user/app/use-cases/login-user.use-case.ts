import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { InputLoginUser } from 'src/modules/user/types';
import { InvalidDataError } from 'src/shared/error/invalid-data-error';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Hasher } from 'src/helper/hasher';

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
      throw new InvalidDataError();
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Credenciais Inválidas');
    }

    const isSamePassword = await this.hasher.compare(password, user.password);

    if (!isSamePassword) {
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

    return {
      accesToken: jwt,
    };
  }
}
