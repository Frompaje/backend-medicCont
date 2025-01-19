import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateTaxes {
  execute({ totalIncome, deductionsTotal }: Input) {
    const taxableIncome = totalIncome - deductionsTotal;
    const faixaIncome = [
      { faixa: 2.826, taxa: 7.5 },
      { faixa: 3.751, taxa: 15 },
      { faixa: 4.664, taxa: 22.5 },
      { faixa: 5.535, taxa: 27.5 },
      ,
    ];

    for (const value of faixaIncome) {
      if (taxableIncome > value.faixa) {
        return (taxableIncome * value.taxa) / 100;
      }
    }
    return taxableIncome;
  }
}
type Input = {
  totalIncome: number;
  deductionsTotal: number;
};
