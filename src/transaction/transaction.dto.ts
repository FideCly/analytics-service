import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly balanceId: number;
}
