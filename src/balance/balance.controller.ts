import { Controller, Post } from "@nestjs/common";
import { CreateOrUpdateBalanceDto } from "./balance.dto";
import { BalanceService } from "./balance.service";

@Controller("balance")
export class BalanceController {
  constructor(private service: BalanceService) {}

  @Post()
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
