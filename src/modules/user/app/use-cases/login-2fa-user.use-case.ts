// import { UserRepository } from 'src/modules/user/app/repository/user.repository';
// import { BadRequestException, Injectable } from '@nestjs/common';
// import { logger } from 'src/infra/logger';

// @Injectable()
// export class Login2FAUserUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(token: number) {
//     if (!token) {
//       logger.info('[ERROR-001] Dados invalidos');

//       throw new BadRequestException('Dados Inválidas');
//     }

//   }
// }
