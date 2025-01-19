import { Status } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateTaxesDto {
  @IsNumber()
  totalIncome: number;

  @IsNumber()
  dependents: number;

  @IsNumber()
  year: number;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsDate()
  submissionDate: Date;
}
