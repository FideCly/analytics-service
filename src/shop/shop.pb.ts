/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "analytics";

export interface SendShopRequest {
  id: number;
  isActive: boolean;
}

export interface SendShopResponse {
  status: number;
  errors: string[];
}

export const ANALYTICS_PACKAGE_NAME = "analytics";

export interface ShopServiceClient {
  send(request: SendShopRequest): Observable<SendShopResponse>;
}

export interface ShopServiceController {
  send(request: SendShopRequest): Promise<SendShopResponse> | Observable<SendShopResponse> | SendShopResponse;
}

export function ShopServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ShopService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ShopService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SHOP_SERVICE_NAME = "ShopService";
