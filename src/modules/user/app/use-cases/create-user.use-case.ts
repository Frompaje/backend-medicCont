import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { InputCreateUser } from 'src/modules/user/types';
import { InvalidDataError } from 'src/shared/error/invalid-data-error';
import { Injectable } from '@nestjs/common';
import { Hasher } from 'src/helper/hasher';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
  ) {}
  async execute({ name, email, password }: InputCreateUser) {
    if (!name || !email || !password) {
      throw new InvalidDataError();
    }

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new InvalidDataError();
    }
    const passwordHashed = await this.hasher.hash(password);

    await this.userRepository.create({
      name,
      password: passwordHashed,
      email,
    });
  }
}
