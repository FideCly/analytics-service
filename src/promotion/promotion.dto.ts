import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrUpdatePromotionDto {
  @IsNotEmpty()
  @IsString()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly shopId: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly checkoutLimit: number;

  @IsNotEmpty()
  @IsDateString()
  readonly startAt: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly endAt: Date;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}
