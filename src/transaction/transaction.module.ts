import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionService } from "./transaction.service";
import { Transaction } from "./transaction.entity";

@Module({
  providers: [TransactionService],
  imports: [TypeOrmModule.forFeature([Transaction])],
  exports: [TransactionService, TypeOrmModule],
})
export class TransactionModule {}
