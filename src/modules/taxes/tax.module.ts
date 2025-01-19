import { Module } from '@nestjs/common';
import { PrismaTaxesRepository } from 'src/modules/taxes/app/repository/prisma-repository';
import { TaxesRepository } from 'src/modules/taxes/app/repository/taxes.repository';
import { CreateTaxesUseCase } from 'src/modules/taxes/app/use-cases/create-taxes.use-case';
import { ListTaxesUseCase } from 'src/modules/taxes/app/use-cases/list-taxes.use-case';
import { TaxeController } from 'src/modules/taxes/http/taxes.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [TaxeController],
  providers: [
    CreateTaxesUseCase,
    ListTaxesUseCase,
    {
      provide: TaxesRepository,
      useClass: PrismaTaxesRepository,
    },
    JwtService,
  ],
})
export class TaxModule {}
