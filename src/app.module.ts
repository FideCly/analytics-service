import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { CardModule } from "./card/card.module";
import { ShopModule } from "./shop/shop.module";
import { PromotionModule } from "./promotion/promotion.module";
import { BalanceModule } from "./balance/balance.module";

@Module({
  imports: [
    CardModule,
    ShopModule,
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.dev"],
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      migrationsRun: true,
      synchronize: Boolean(process.env.SYNCHRONIZE),
      logging: false,
      autoLoadEntities: true,
    }),
    PromotionModule,
    BalanceModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
