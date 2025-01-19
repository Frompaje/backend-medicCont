import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { TaxesRepository } from 'src/modules/taxes/app/repository/taxes.repository';
import { InputCreateTaxes, Taxes } from 'src/modules/taxes/types';

@Injectable()
export class PrismaTaxesRepository implements TaxesRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create({
    userId,
    totalTax,
    deductionsTotal,
    monthlyTax,
    totalIncome,
    year,
    submissionDate,
  }: InputCreateTaxes): Promise<void> {
    await this.prisma.taxDeclarations.create({
      data: {
        totalTax,
        deductionsTotal,
        monthlyTax,
        totalIncome,
        year,
        submissionDate,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async listByUserId(userId: string): Promise<Taxes[]> {
    return this.prisma.taxDeclarations.findMany({
      where: {
        users: {
          id: userId,
        },
      },
    });
  }
}
