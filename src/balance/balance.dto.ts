import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrUpdateBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly promotionId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly cardId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly counter: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
