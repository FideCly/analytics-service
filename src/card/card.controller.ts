import { Body, Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateOrUpdateCardDto } from "./card.dto";
import { ANALYTICS_PACKAGE_NAME } from "./card.pb";
import { CardService } from "./card.service";

@Controller("card")
export class CardController {
  constructor(private service: CardService) {}

  @GrpcMethod(ANALYTICS_PACKAGE_NAME, "Send")
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
