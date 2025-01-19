import { BadRequestException, Injectable } from '@nestjs/common';
import { logger } from 'src/infra/logger';
import { TaxesRepository } from 'src/modules/taxes/app/repository/taxes.repository';
import { InputCreateTaxes } from 'src/modules/taxes/types';

@Injectable()
export class CreateTaxesUseCase {
  constructor(private readonly taxesRepository: TaxesRepository) {}

  async execute({
    deductionsTotal,
    monthlyTax,
    submissionDate,
    totalIncome,
    totalTax,
    userId,
    year,
  }: InputCreateTaxes) {
    if (
      !deductionsTotal ||
      !monthlyTax ||
      !submissionDate ||
      !totalIncome ||
      !totalTax ||
      !userId ||
      !year
    ) {
      logger.error('[ERROR-001] Dados invalidos');
      throw new BadRequestException('[ERROR-001] Dados invalidos');
    }

    logger.info('[Usecase] Taxa criado');
    await this.taxesRepository.create({
      userId,
      deductionsTotal,
      monthlyTax,
      submissionDate,
      totalIncome,
      totalTax,
      year,
    });
  }
}
