import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateTaxes {
  execute(totalIncome: number) {
    if (2259.2 > totalIncome) {
      return (totalIncome * 0) / 100 - 0;
    }
    if (2259.21 < totalIncome && totalIncome < 2826.65) {
      return (totalIncome * 7.5) / 100 - 169.44;
    }
    if (2826.66 < totalIncome && totalIncome < 3751.05) {
      return (totalIncome * 15) / 100 - 381.44;
    }
    if (3751.06 < totalIncome && totalIncome < 4664.68) {
      return (totalIncome * 22.5) / 100 - 662.77;
    }
    if (4664.68 < totalIncome) {
      return (totalIncome * 27.5) / 100 - 896.0;
    }
  }
}
