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

export const ANALYTICS_PACKAGE_NAME = "analytics";

export interface BalanceServiceClient {
  send(request: SendBalanceRequest): Observable<SendBalanceResponse>;
}

export interface BalanceServiceController {
  send(
    request: SendBalanceRequest,
  ): Promise<SendBalanceResponse> | Observable<SendBalanceResponse> | SendBalanceResponse;
}

export function BalanceServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BalanceService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BalanceService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BALANCE_SERVICE_NAME = "BalanceService";
