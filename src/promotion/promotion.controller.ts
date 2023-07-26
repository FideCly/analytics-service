import { Body, Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { PROMOTION_SERVICE_NAME } from "src/analytics.pb";
import { CreateOrUpdatePromotionDto } from "./promotion.dto";
import { PromotionService } from "./promotion.service";

@Controller()
export class PromotionController {
  constructor(private service: PromotionService) {}

  @GrpcMethod(PROMOTION_SERVICE_NAME, "Send")
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

    return this.service.create(createOrUpdatePromotionDto);
  }
}
