import { BadRequestException, Injectable } from '@nestjs/common';
import { CalculateTaxes } from 'src/helper/calculateTaxes';
import { logger } from 'src/infra/logger';
import { TaxesRepository } from 'src/modules/taxes/app/repository/taxes.repository';
import { InputCreateTaxes } from 'src/modules/taxes/types';

@Injectable()
export class CreateTaxesUseCase {
  constructor(
    private readonly taxesRepository: TaxesRepository,
    private readonly calculateTaxes: CalculateTaxes,
  ) {}

  async execute({
    deductionsTotal,
    monthlyTax,
    submissionDate,
    totalIncome,
    userId,
    year,
  }: InputCreateTaxes) {
    if (
      !deductionsTotal ||
      !monthlyTax ||
      !submissionDate ||
      !totalIncome ||
      !userId ||
      !year
    ) {
      logger.error('[ERROR-001] Dados invalidos');
      throw new BadRequestException('[ERROR-001] Dados invalidos');
    }

    const totalTaxYear = this.calculateTaxes.execute({
      totalIncome,
      deductionsTotal,
    });

    logger.info('[Usecase] Taxa criado');
    await this.taxesRepository.create({
      userId,
      deductionsTotal,
      monthlyTax,
      submissionDate,
      totalIncome,
      totalTax: totalTaxYear,
      year,
    });
  }
}
