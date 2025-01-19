import { IsDate, IsNumber } from 'class-validator';

export class CreateTaxesDto {
  @IsNumber()
  totalIncome: number;

  @IsNumber()
  dependents: number;

  @IsNumber()
  deductionsTotal: number;

  @IsNumber()
  totalTax: number;

  @IsNumber()
  monthlyTax: number;

  @IsNumber()
  year: number;

  @IsDate()
  submissionDate: Date;
}
