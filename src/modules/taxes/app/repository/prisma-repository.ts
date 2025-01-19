import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { TaxesRepository } from 'src/modules/taxes/app/repository/taxes.repository';
import { InputCreateTaxes, ListInput, Taxes } from 'src/modules/taxes/types';

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

  async list(userId: string, data: ListInput): Promise<Taxes[]> {
    return this.prisma.taxDeclarations.findMany({
      where: {
        userId,
        OR: [
          {
            year: { equals: data.search },
          },
          {
            userId: {
              contains: String(data.search),
              mode: 'insensitive',
            },
          },
        ],
      },
      take: data.take,
      skip: (data.page - 1) * data.take,
    });
  }
  count(userId: string, search?: number): Promise<number> {
    return this.prisma.taxDeclarations.count({
      where: {
        userId,
        OR: [
          {
            year: { equals: search },
          },
          {
            userId: {
              contains: String(search),
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
}
