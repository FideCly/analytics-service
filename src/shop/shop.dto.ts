import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrUpdateShopDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
