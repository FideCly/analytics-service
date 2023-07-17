/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "analytics";

export interface SendBalanceRequest {
  id: number;
  promotionId: number;
  cardId: number;
  counter: number;
  isActive: boolean;
}

export interface SendBalanceResponse {
  status: number;
  errors: string[];
}

export interface SendCardRequest {
  id: number;
  shopId: number;
  userId: number;
  startAt: string;
  endAt: string;
  isActive: boolean;
}

export interface SendCardResponse {
  status: number;
  errors: string[];
}

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

export interface SendPromotionRequest {
  id: number;
  shopId: number;
  name: string;
  checkoutLimit: number;
  startAt: string;
  endAt: string;
  isActive: boolean;
}

export interface SendPromotionResponse {
  status: number;
  errors: string[];
}

export interface SendShopRequest {
  id: number;
  isActive: boolean;
}

export interface SendShopResponse {
  status: number;
  errors: string[];
}

export const ANALYTICS_PACKAGE_NAME = "analytics";

/** Balance Service */

export interface BalanceServiceClient {
  send(request: SendBalanceRequest): Observable<SendBalanceResponse>;
}

/** Balance Service */

export interface BalanceServiceController {
  send(
    request: SendBalanceRequest
  ):
    | Promise<SendBalanceResponse>
    | Observable<SendBalanceResponse>
    | SendBalanceResponse;
}

export function BalanceServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("BalanceService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("BalanceService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const BALANCE_SERVICE_NAME = "BalanceService";

/** Card Service */

export interface CardServiceClient {
  send(request: SendCardRequest): Observable<SendCardResponse>;
}

/** Card Service */

export interface CardServiceController {
  send(
    request: SendCardRequest
  ):
    | Promise<SendCardResponse>
    | Observable<SendCardResponse>
    | SendCardResponse;
}

export function CardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("CardService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("CardService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const CARD_SERVICE_NAME = "CardService";

/** General Service */

export interface AnalyticsServiceClient {
  getAffluence(request: GetAffluenceRequest): Observable<GetAffluenceResponse>;

  getPromotionCheckoutsCount(
    request: GetPromotionCheckoutsCountRequest
  ): Observable<GetPromotionCheckoutsCountResponse>;

  getClientsCount(
    request: GetClientsCountRequest
  ): Observable<GetClientsCountResponse>;

  getPromotionsRanking(
    request: GetPromotionsRankingRequest
  ): Observable<GetPromotionsRankingResponse>;
}

/** General Service */

export interface AnalyticsServiceController {
  getAffluence(
    request: GetAffluenceRequest
  ):
    | Promise<GetAffluenceResponse>
    | Observable<GetAffluenceResponse>
    | GetAffluenceResponse;

  getPromotionCheckoutsCount(
    request: GetPromotionCheckoutsCountRequest
  ):
    | Promise<GetPromotionCheckoutsCountResponse>
    | Observable<GetPromotionCheckoutsCountResponse>
    | GetPromotionCheckoutsCountResponse;

  getClientsCount(
    request: GetClientsCountRequest
  ):
    | Promise<GetClientsCountResponse>
    | Observable<GetClientsCountResponse>
    | GetClientsCountResponse;

  getPromotionsRanking(
    request: GetPromotionsRankingRequest
  ):
    | Promise<GetPromotionsRankingResponse>
    | Observable<GetPromotionsRankingResponse>
    | GetPromotionsRankingResponse;
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
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("AnalyticsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("AnalyticsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const ANALYTICS_SERVICE_NAME = "AnalyticsService";

/** Promotion Service */

export interface PromotionServiceClient {
  send(request: SendPromotionRequest): Observable<SendPromotionResponse>;
}

/** Promotion Service */

export interface PromotionServiceController {
  send(
    request: SendPromotionRequest
  ):
    | Promise<SendPromotionResponse>
    | Observable<SendPromotionResponse>
    | SendPromotionResponse;
}

export function PromotionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("PromotionService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("PromotionService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const PROMOTION_SERVICE_NAME = "PromotionService";

/** Shop Service */

export interface ShopServiceClient {
  send(request: SendShopRequest): Observable<SendShopResponse>;
}

/** Shop Service */

export interface ShopServiceController {
  send(
    request: SendShopRequest
  ):
    | Promise<SendShopResponse>
    | Observable<SendShopResponse>
    | SendShopResponse;
}

export function ShopServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("ShopService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("ShopService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const SHOP_SERVICE_NAME = "ShopService";
