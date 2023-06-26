import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BalanceController } from "./balance.controller";
import { Balance } from "./balance.entity";
import { BalanceService } from "./balance.service";

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [TypeOrmModule.forFeature([Balance])],
})
export class BalanceModule {}
