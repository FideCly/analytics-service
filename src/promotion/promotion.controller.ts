import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrUpdatePromotionDto } from "./promotion.dto";
import { PromotionService } from "./promotion.service";

@Controller("promotion")
export class PromotionController {
  constructor(private service: PromotionService) {}
  @Post()
  async createOrUpdate(
    @Body() createOrUpdatePromotionDto: CreateOrUpdatePromotionDto
  ) {
    const promotion = await this.service.findOne(
      +createOrUpdatePromotionDto.id
    );
    if (promotion) {
      return this.service.update(
        +createOrUpdatePromotionDto.id,
        createOrUpdatePromotionDto
      );
    }

    return this.service.create(
      createOrUpdatePromotionDto,
      +createOrUpdatePromotionDto.id
    );
  }
}
