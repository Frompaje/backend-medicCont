import { IsOptional, IsString } from 'class-validator';
import { ParamsDto } from 'src/shared/params.dto';

export class ListTaxesDto extends ParamsDto {
  @IsString()
  @IsOptional()
  search?: string;
}
