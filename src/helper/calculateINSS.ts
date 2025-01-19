import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateINSS {
  execute(totalIncome: number) {
    if (1518 >= totalIncome) {
      return (totalIncome * 7.5) / 100;
    }
    if (1518 < totalIncome && totalIncome < 2793) {
      return (totalIncome * 9) / 100;
    }
    if (2793 < totalIncome && totalIncome < 4190) {
      return (totalIncome * 12) / 100;
    }
    if (4190 < totalIncome && totalIncome < 8157) {
      return (totalIncome * 14) / 100;
    }
  }
}
