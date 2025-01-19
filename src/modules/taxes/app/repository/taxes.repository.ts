import { InputCreateTaxes, ListInput, Taxes } from 'src/modules/taxes/types';

export abstract class TaxesRepository {
  abstract create({
    userId,
    totalTax,
    submissionDate,
    year,
    status,
  }: InputCreateTaxes): Promise<void>;

  abstract list(userId: string, data: ListInput): Promise<Taxes[]>;

  abstract count(userId: string, search?: number): Promise<number>;
}
