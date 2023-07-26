import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { BALANCE_SERVICE_NAME } from "../analytics.pb";
import { CreateOrUpdateBalanceDto } from "./balance.dto";
import { BalanceService } from "./balance.service";

@Controller()
export class BalanceController {
  constructor(private service: BalanceService) {}

  @GrpcMethod(BALANCE_SERVICE_NAME, "Send")
  async createOrUpdate(createOrUpdateBalanceDto: CreateOrUpdateBalanceDto) {
    const balance = await this.service.findOne(+createOrUpdateBalanceDto.id);

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
