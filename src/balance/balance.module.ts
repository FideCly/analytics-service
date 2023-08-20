import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BalanceController } from "./balance.controller";
import { Balance } from "./balance.entity";
import { BalanceService } from "./balance.service";
import { TransactionModule } from "../transaction/transaction.module";

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [
    TypeOrmModule.forFeature([Balance]),
    forwardRef(() => TransactionModule),
  ],
  exports: [BalanceService, TypeOrmModule],
})
export class BalanceModule {}
