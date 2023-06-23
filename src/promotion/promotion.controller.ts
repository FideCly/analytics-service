import { Body, Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateOrUpdatePromotionDto } from "./promotion.dto";
import { ANALYTICS_PACKAGE_NAME } from "./promotion.pb";
import { PromotionService } from "./promotion.service";

@Controller("promotion")
export class PromotionController {
	constructor(private service: PromotionService) {}

	@GrpcMethod(ANALYTICS_PACKAGE_NAME, "Send")
	async createOrUpdate(@Body() createOrUpdatePromotionDto: CreateOrUpdatePromotionDto) {
		const promotion = await this.service.findOne(+createOrUpdatePromotionDto.id);
		if (promotion) {
			return this.service.update(+createOrUpdatePromotionDto.id, createOrUpdatePromotionDto);
		}

		return this.service.create(createOrUpdatePromotionDto, +createOrUpdatePromotionDto.id);
	}
}
