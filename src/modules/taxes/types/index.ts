import { $Enums } from '@prisma/client';

export type InputCreateTaxes = {
  userId: string;
  year: number;
  totalTax: number;
  monthlyTax: number;
  taxBase: number;
  submissionDate: Date;
  status?: $Enums.Status;
};

export type ListInput = {
  page: number;
  take: number;
  search?: number;
};

export type Taxes = {
  id: number;
  userId: string;
  monthlyTax: number;
  submissionDate: Date;
  year: number;
  totalTax: number;
  taxBase: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
};
