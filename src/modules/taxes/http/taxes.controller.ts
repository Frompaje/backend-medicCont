import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTaxesUseCase } from 'src/modules/taxes/app/use-cases/create-taxes.use-case';
import { ListTaxesUseCase } from 'src/modules/taxes/app/use-cases/list-taxes.use-case';
import { CreateTaxesDto } from 'src/modules/taxes/http/dto/create-taxes.dto';
import { ListTaxesDto } from 'src/modules/taxes/http/dto/list-taxes.dto';
import { AuthUser } from 'src/modules/user/app/@decorators/auth.user';
import { AuthGuard } from 'src/modules/user/app/guards/auth.guards';
import { JwtPayload } from 'src/shared/auth-user';

@UseGuards(AuthGuard)
@Controller('taxes')
export class TaxeController {
  constructor(
    private readonly createTaxesUseCase: CreateTaxesUseCase,
    private readonly listTaxesUseCase: ListTaxesUseCase,
  ) {}

  @Post()
  create(@Body() body: CreateTaxesDto, @AuthUser() jwt: JwtPayload) {
    this.createTaxesUseCase.execute({
      deductionsTotal: body.deductionsTotal,
      monthlyTax: body.monthlyTax,
      submissionDate: body.submissionDate,
      totalIncome: body.totalIncome,
      totalTax: body.totalTax,
      year: body.year,
      dependents: body.dependents,
      userId: jwt.user.id,
    });
  }

  @Get()
  list(@Query() params: ListTaxesDto, @AuthUser() jwt: JwtPayload) {
    return this.listTaxesUseCase.execute({
      userId: jwt.user.id,
      params: {
        page: Number(params.page) || 1,
        take: Number(params.take) || 10,
        search: Number(params.search),
      },
    });
  }
}
