import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardController } from "./card.controller";
import { Card } from "./card.entity";
import { CardService } from "./card.service";

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [TypeOrmModule.forFeature([Card])],
  exports: [CardService, TypeOrmModule],
})
export class CardModule {}
