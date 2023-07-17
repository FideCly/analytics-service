import { INestMicroservice } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { protobufPackage } from "./analytics.pb";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.URL}:${process.env.PORT}`,
        package: protobufPackage,
        protoPath: join(
          "node_modules/@fidecly/grpc-proto/proto/analytics/analytics.proto"
        ),
      },
    }
  );
  await app.listen();
}
bootstrap();
