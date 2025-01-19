import { InputCreateTaxes, Taxes } from 'src/modules/taxes/types';

export abstract class TaxesRepository {
  abstract create({
    userId,
    totalTax,
    deductionsTotal,
    monthlyTax,
    totalIncome,
  }: InputCreateTaxes): Promise<void>;

  abstract listByUserId(userId: string): Promise<Taxes[]>;
}
