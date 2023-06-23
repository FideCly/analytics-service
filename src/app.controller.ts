import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  GetAffluenceRequestDto,
  GetClientsCountRequestDto,
  GetPromotionCheckoutsCountRequestDto,
} from "./analytics.dto";
import { AppService } from "./app.service";
import {
  ANALYTICS_SERVICE_NAME,
  GetAffluenceResponse,
  GetPromotionsRankingRequest,
} from "./general.pb";

@Controller("analytics")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(ANALYTICS_SERVICE_NAME, "getAffluence")
  public affluence(
    payload: GetAffluenceRequestDto
  ): Promise<GetAffluenceResponse> {
    return this.appService.getAffluence(
      payload.shopId,
      payload.startDate,
      payload.endDate
    );
  }

  @GrpcMethod(ANALYTICS_SERVICE_NAME, "getPromotionCheckoutsCount")
  promotionCheckoutsCount(
    payload: GetPromotionCheckoutsCountRequestDto
  ): Promise<any> {
    return this.appService.getPromotionCheckoutsCount(
      payload.shopId,
      payload.promotionId,
      payload.startDate,
      payload.endDate
    );
  }

  @GrpcMethod(ANALYTICS_SERVICE_NAME, "getClientsCount")
  clientsCount(payload: GetClientsCountRequestDto) {
    return this.appService.getClientsCount(
      payload.shopId,
      payload.startDate,
      payload.endDate
    );
  }

  @GrpcMethod(ANALYTICS_SERVICE_NAME, "getPromotionsRanking")
  promotionsRanking(payload: GetPromotionsRankingRequest) {
    return this.appService.getPromotionsRanking(
      payload.shopId,
      payload.startDate,
      payload.endDate
    );
  }
}
