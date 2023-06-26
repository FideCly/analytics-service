import { INestMicroservice } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app.module";
import { protobufPackage } from "./general.pb";

async function bootstrap() {
  const paths: string[] = [
    "node_modules/@fidecly/grpc-proto/proto/analytics/balance.proto.proto",
    "node_modules/@fidecly/grpc-proto/proto/analytics/promotion.proto",
    "node_modules/@fidecly/grpc-proto/proto/analytics/shop.proto",
    "node_modules/@fidecly/grpc-proto/proto/analytics/card.proto",
    "node_modules/@fidecly/grpc-proto/proto/analytics/general.proto",
  ];

  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.URL}:${process.env.PORT}`,
        package: protobufPackage,
        protoPath: join(...paths),
      },
    }
  );
  await app.listen();
}
bootstrap();
