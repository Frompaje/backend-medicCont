import { BadRequestException, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
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
    submissionDate,
    totalIncome,
    userId,
    dependents,
    year,
    status,
  }: Input) {
    if (!submissionDate || !totalIncome || !userId || !year || !dependents) {
      logger.error('[ERROR-001] Dados invalidos');
      throw new BadRequestException('[ERROR-001] Dados invalidos');
    }

    const INSS = this.calculateINSS.execute(totalIncome);

    const dependentsValue = 189.59 * dependents;

    const baseCalc = Number(totalIncome - INSS - dependentsValue);

    const totalTaxMoth = this.calculateTaxes.execute(baseCalc);

    const totalTaxYear = Number(String(totalTaxMoth).slice(0, 6)) * 12;

    logger.info('[Usecase] Taxa criado');
    await this.taxesRepository.create({
      userId,
      submissionDate,
      monthlyTax: totalTaxMoth,
      taxBase: baseCalc,
      totalTax: totalTaxYear,
      year,
      status,
    });
  }
}
export type Input = {
  userId: string;
  dependents: number;
  totalIncome: number;
  year: number;
  status?: Status;
  submissionDate: Date;
};
