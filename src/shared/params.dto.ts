import { IsNumberString } from 'class-validator';

export class ParamsDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  take: number;
}
