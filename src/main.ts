import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestMicroservice } from '@nestjs/common';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.URL}:${process.env.PORT}`,
        package: protobufPackage,
        protoPath: join(
          'node_modules/@fidecly/grpc-proto/proto/campaign.proto',
        ),
      },
    },
  );
  await app.listen();
}
bootstrap();
