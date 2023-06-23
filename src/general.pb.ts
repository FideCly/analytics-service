/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "analytics";

export interface GetAffluenceRequest {
  shopId: number;
  startDate: string;
  endDate: string;
}

export interface GetAffluenceResponse {
  status: number;
  value: number;
  errors: string[];
}

export interface GetPromotionCheckoutsCountRequest {
  shopId: number;
  promotionId: number;
  startDate: string;
  endDate: string;
}

export interface GetPromotionCheckoutsCountResponse {
  status: number;
  value: number;
  errors: string[];
}

export interface GetClientsCountRequest {
  shopId: number;
  startDate: string;
  endDate: string;
}

export interface GetClientsCountResponse {
  status: number;
  value: number;
  errors: string[];
}

export interface GetPromotionsRankingRequest {
  shopId: number;
  startDate: string;
  endDate: string;
}

export interface GetPromotionsRankingResponse {
  status: number;
  promotionNames: string[];
  values: number[];
  errors: string[];
}

export const ANALYTICS_PACKAGE_NAME = "analytics";

export interface AnalyticsServiceClient {
  getAffluence(request: GetAffluenceRequest): Observable<GetAffluenceResponse>;

  getPromotionCheckoutsCount(
    request: GetPromotionCheckoutsCountRequest,
  ): Observable<GetPromotionCheckoutsCountResponse>;

  getClientsCount(request: GetClientsCountRequest): Observable<GetClientsCountResponse>;

  getPromotionsRanking(request: GetPromotionsRankingRequest): Observable<GetPromotionsRankingResponse>;
}

export interface AnalyticsServiceController {
  getAffluence(
    request: GetAffluenceRequest,
  ): Promise<GetAffluenceResponse> | Observable<GetAffluenceResponse> | GetAffluenceResponse;

  getPromotionCheckoutsCount(
    request: GetPromotionCheckoutsCountRequest,
  ):
    | Promise<GetPromotionCheckoutsCountResponse>
    | Observable<GetPromotionCheckoutsCountResponse>
    | GetPromotionCheckoutsCountResponse;

  getClientsCount(
    request: GetClientsCountRequest,
  ): Promise<GetClientsCountResponse> | Observable<GetClientsCountResponse> | GetClientsCountResponse;

  getPromotionsRanking(
    request: GetPromotionsRankingRequest,
  ): Promise<GetPromotionsRankingResponse> | Observable<GetPromotionsRankingResponse> | GetPromotionsRankingResponse;
}

export function AnalyticsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getAffluence",
      "getPromotionCheckoutsCount",
      "getClientsCount",
      "getPromotionsRanking",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AnalyticsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AnalyticsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ANALYTICS_SERVICE_NAME = "AnalyticsService";
