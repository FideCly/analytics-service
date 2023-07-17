import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import {
  GetAffluenceRequest,
  GetClientsCountRequest,
  GetPromotionCheckoutsCountRequest,
  GetPromotionsRankingRequest,
} from "./analytics.pb";

export class GetAffluenceRequestDto implements GetAffluenceRequest {
  @IsNotEmpty()
  @IsNumber()
  shopId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

export class GetPromotionCheckoutsCountRequestDto
  implements GetPromotionCheckoutsCountRequest
{
  @IsNotEmpty()
  @IsNumber()
  shopId: number;

  @IsNotEmpty()
  @IsNumber()
  promotionId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

export class GetClientsCountRequestDto implements GetClientsCountRequest {
  @IsNotEmpty()
  @IsNumber()
  shopId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

export class GetPromotionsRankingRequestDto
  implements GetPromotionsRankingRequest
{
  @IsNotEmpty()
  @IsNumber()
  shopId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
