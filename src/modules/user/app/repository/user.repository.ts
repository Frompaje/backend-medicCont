import { InputCreateUser, User } from 'src/modules/user/types';

export abstract class UserRepository {
  abstract create({ name, password, email }: InputCreateUser): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
