import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopModule } from "src/shop/shop.module";
import { CardController } from "./card.controller";
import { Card } from "./card.entity";
import { CardService } from "./card.service";

@Module({
	controllers: [CardController],
	providers: [CardService],
	imports: [forwardRef(() => ShopModule), TypeOrmModule.forFeature([Card])]
})
export class CardModule {}
