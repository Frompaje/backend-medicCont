import { UserRepository } from 'src/modules/user/app/repository/user.repository';
import { InputCreateUser } from 'src/modules/user/types';
import { InvalidDataError } from 'src/shared/error/invalid-data-error';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ name, email, password }: InputCreateUser) {
    if (!name || !email || !password) {
      throw new InvalidDataError();
    }

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new InvalidDataError();
    }

    await this.userRepository.create({
      name,
      password,
      email,
    });
  }
}
