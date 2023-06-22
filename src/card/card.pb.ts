/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "analytics";

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

export const ANALYTICS_PACKAGE_NAME = "analytics";

export interface CardServiceClient {
  send(request: SendCardRequest): Observable<SendCardResponse>;
}

export interface CardServiceController {
  send(request: SendCardRequest): Promise<SendCardResponse> | Observable<SendCardResponse> | SendCardResponse;
}

export function CardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CardService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CardService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CARD_SERVICE_NAME = "CardService";
