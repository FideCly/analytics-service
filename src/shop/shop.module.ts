import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopController } from "./shop.controller";
import { Shop } from "./shop.entity";
import { ShopService } from "./shop.service";

@Module({
	controllers: [ShopController],
	imports: [TypeOrmModule.forFeature([Shop])],
	providers: [ShopService]
})
export class ShopModule {}
