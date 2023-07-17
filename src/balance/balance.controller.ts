import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { ANALYTICS_PACKAGE_NAME } from "../analytics.pb";
import { CreateOrUpdateBalanceDto } from "./balance.dto";
import { BalanceService } from "./balance.service";

@Controller("balance")
export class BalanceController {
  constructor(private service: BalanceService) {}

  @GrpcMethod(ANALYTICS_PACKAGE_NAME, "Send")
  async createOrUpdate(createOrUpdateBalanceDto: CreateOrUpdateBalanceDto) {
    const balance = await this.service.findOne(
      +createOrUpdateBalanceDto.promotionId
    );

    if (balance) {
      return this.service.update(
        +createOrUpdateBalanceDto.promotionId,
        createOrUpdateBalanceDto
      );
    } else {
      return this.service.create(createOrUpdateBalanceDto);
    }
  }
}
