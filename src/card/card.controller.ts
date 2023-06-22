import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrUpdateCardDto } from "./card.dto";
import { CardService } from "./card.service";

@Controller("card")
export class CardController {
  constructor(private service: CardService) {}

  @Post()
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
