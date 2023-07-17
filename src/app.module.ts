import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BalanceModule } from "./balance/balance.module";
import { CardModule } from "./card/card.module";
import { PromotionModule } from "./promotion/promotion.module";
import { ShopModule } from "./shop/shop.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.development", "env.test"],
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

    CardModule,
    ShopModule,
    PromotionModule,
    BalanceModule,
  ],

  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
