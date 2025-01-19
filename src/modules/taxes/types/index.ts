export type InputCreateTaxes = {
  userId: string;
  totalIncome: number;
  deductionsTotal: number;
  totalTax: number;
  monthlyTax: number;
  year: number;
  submissionDate: Date;
};

export type ListInput = {
  page: number;
  take: number;
  search?: number;
};

export type Taxes = {
  id: number;
  userId: string;
  year: number;
  totalIncome: number;
  deductionsTotal: number;
  submissionDate: Date;
  totalTax: number;
  monthlyTax: number;

  createdAt: Date;
  updatedAt: Date;
};
