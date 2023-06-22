import { Controller, Post } from '@nestjs/common';
import { CreateOrUpdateBalanceDto } from './balance.dto';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private service: BalanceService) {}

  @Post()
  async createOrUpdate(CreateOrUpdateBalanceDto: CreateOrUpdateBalanceDto) {
    const balance = await this.service.findOne(
      +CreateOrUpdateBalanceDto.promotionId,
    );

    if (balance) {
      return this.service.update(
        +CreateOrUpdateBalanceDto.promotionId,
        CreateOrUpdateBalanceDto,
      );
    } else {
      return this.service.create(CreateOrUpdateBalanceDto);
    }
  }
}
