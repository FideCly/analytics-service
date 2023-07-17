import { Body, Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { ANALYTICS_PACKAGE_NAME } from "../analytics.pb";
import { CreateOrUpdateShopDto } from "./shop.dto";
import { ShopService } from "./shop.service";

@Controller("shop")
export class ShopController {
  constructor(private service: ShopService) {}

  @GrpcMethod(ANALYTICS_PACKAGE_NAME, "Send")
  async createOrUpdate(@Body() createOrUpdateShopDto: CreateOrUpdateShopDto) {
    const promotion = await this.service.findOne(+createOrUpdateShopDto.id);
    if (promotion) {
      return this.service.update(
        +createOrUpdateShopDto.id,
        createOrUpdateShopDto
      );
    }

    return this.service.create(
      createOrUpdateShopDto,
      +createOrUpdateShopDto.id
    );
  }
}
