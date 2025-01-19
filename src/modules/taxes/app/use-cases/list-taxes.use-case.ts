import { BadRequestException, Injectable } from '@nestjs/common';
import { logger } from 'src/infra/logger';
import { TaxesRepository } from 'src/modules/taxes/app/repository/taxes.repository';

@Injectable()
export class ListTaxesUseCase {
  constructor(private readonly taxesRepository: TaxesRepository) {}

  async execute({ userId, params }: Input) {
    if (!userId || !params) {
      logger.error('[ERROR-001] Dados invalidos');
      throw new BadRequestException('[ERROR-001] Dados invalidos');
    }

    const taxesList = await this.taxesRepository.list(userId, params);

    const count = await this.taxesRepository.count(userId, params.search);

    logger.error('[Usecase] Listagem das taxas ');
    return {
      data: taxesList,
      meta: {
        page: params.page,
        take: params.page,
        total: count,
      },
    };
  }
}
type Input = {
  params: {
    page: number;
    take: number;
    search?: number;
  };
  userId: string;
};
