import { Body, Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { SHOP_SERVICE_NAME } from "../analytics.pb";
import { CreateOrUpdateShopDto } from "./shop.dto";
import { ShopService } from "./shop.service";

@Controller()
export class ShopController {
  constructor(private service: ShopService) {}

  @GrpcMethod(SHOP_SERVICE_NAME, "Send")
  async send(@Body() createOrUpdateShopDto: CreateOrUpdateShopDto) {
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
