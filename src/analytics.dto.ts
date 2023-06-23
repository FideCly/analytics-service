import { IsNotEmpty } from "class-validator";
import {
  GetAffluenceRequest,
  GetClientsCountRequest,
  GetPromotionCheckoutsCountRequest,
  GetPromotionsRankingRequest,
} from "./general.pb";

export class GetAffluenceRequestDto implements GetAffluenceRequest {
  @IsNotEmpty()
  shopId: number;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}

export class GetPromotionCheckoutsCountRequestDto
  implements GetPromotionCheckoutsCountRequest
{
  @IsNotEmpty()
  shopId: number;

  @IsNotEmpty()
  promotionId: number;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}

export class GetClientsCountRequestDto implements GetClientsCountRequest {
  @IsNotEmpty()
  shopId: number;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}

export class GetPromotionsRankingRequestDto
  implements GetPromotionsRankingRequest
{
  @IsNotEmpty()
  shopId: number;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}
