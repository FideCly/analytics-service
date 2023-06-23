/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "analytics";

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

export const ANALYTICS_PACKAGE_NAME = "analytics";

export interface PromotionServiceClient {
  send(request: SendPromotionRequest): Observable<SendPromotionResponse>;
}

export interface PromotionServiceController {
  send(
    request: SendPromotionRequest,
  ): Promise<SendPromotionResponse> | Observable<SendPromotionResponse> | SendPromotionResponse;
}

export function PromotionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PromotionService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PromotionService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PROMOTION_SERVICE_NAME = "PromotionService";
