import { BadRequestException, Injectable } from '@nestjs/common';
import { CalculateINSS } from 'src/helper/calculateINSS';
import { CalculateTaxes } from 'src/helper/calculateTaxes';
import { logger } from 'src/infra/logger';
import { TaxesRepository } from 'src/modules/taxes/app/repository/taxes.repository';

@Injectable()
export class CreateTaxesUseCase {
  constructor(
    private readonly taxesRepository: TaxesRepository,
    private readonly calculateTaxes: CalculateTaxes,
    private readonly calculateINSS: CalculateINSS,
  ) {}

  async execute({
    deductionsTotal,
    monthlyTax,
    submissionDate,
    totalIncome,
    userId,
    dependents,
    year,
  }: Input) {
    if (
      !deductionsTotal ||
      !monthlyTax ||
      !submissionDate ||
      !totalIncome ||
      !userId ||
      !year ||
      !dependents
    ) {
      logger.error('[ERROR-001] Dados invalidos');
      throw new BadRequestException('[ERROR-001] Dados invalidos');
    }

    const INSS = this.calculateINSS.execute(totalIncome);

    const dependentsValue = 189.59 * dependents;

    const baseCalc = totalIncome - INSS - dependentsValue;

    const totalTaxMoth = String(this.calculateTaxes.execute(baseCalc));

    const totalTaxYear = Number(totalTaxMoth.slice(0, 6)) * 12;

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
export type Input = {
  userId: string;
  dependents: number;
  totalIncome: number;
  deductionsTotal: number;
  totalTax: number;
  monthlyTax: number;
  year: number;
  submissionDate: Date;
};
