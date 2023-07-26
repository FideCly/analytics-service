import { Body, Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CARD_SERVICE_NAME } from "../analytics.pb";
import { CreateOrUpdateCardDto } from "./card.dto";
import { CardService } from "./card.service";

@Controller()
export class CardController {
  constructor(private service: CardService) {}

  @GrpcMethod(CARD_SERVICE_NAME, "Send")
  async createOrUpdate(@Body() createOrUpdateCardDto: CreateOrUpdateCardDto) {
    const card = await this.service.findOne(+createOrUpdateCardDto.id);
    if (card) {
      return this.service.update(
        +createOrUpdateCardDto.id,
        createOrUpdateCardDto
      );
    } else {
      return this.service.create(createOrUpdateCardDto);
    }
  }
}
