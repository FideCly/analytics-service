import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PromotionController } from "./promotion.controller";
import { Promotion } from "./promotion.entity";
import { PromotionService } from "./promotion.service";

@Module({
	controllers: [PromotionController],
	imports: [TypeOrmModule.forFeature([Promotion])],
	providers: [PromotionService]
})
export class PromotionModule {}
