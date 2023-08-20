import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "./transaction.entity";
import { CreateTransactionDto } from "./transaction.dto";

@Injectable()
export class TransactionService {
  @InjectRepository(Transaction)
  private readonly repository: Repository<Transaction>;

  findOne(id: number): Promise<Transaction | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        balance: { card: true, promotion: true },
      },
    });
  }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const transaction = this.repository.create({
          ...new Transaction(),
          ...createTransactionDto,
        });

        await manager.save(Transaction, transaction);
        return transaction;
      });

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }
}
