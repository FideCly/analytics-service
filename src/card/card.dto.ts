import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrUpdateCardDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly shopId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsDateString()
  readonly startAt: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly endAt: Date;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
