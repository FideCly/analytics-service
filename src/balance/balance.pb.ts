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

export interface BalancesServiceClient {
  send(request: SendBalanceRequest): Observable<SendBalanceResponse>;
}

export interface BalancesServiceController {
  send(
    request: SendBalanceRequest,
  ): Promise<SendBalanceResponse> | Observable<SendBalanceResponse> | SendBalanceResponse;
}

export function BalancesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BalancesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BalancesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BALANCES_SERVICE_NAME = "BalancesService";
