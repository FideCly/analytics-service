import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrUpdateBalanceDto } from "./balance.dto";
import { Balance } from "./balance.entity";

@Injectable()
export class BalanceService {
  @InjectRepository(Balance)
  private readonly repository: Repository<Balance>;

  findOne(id: number): Promise<Balance | null> {
    return this.repository.findOne({
      where: { id },
      relations: { card: { shop: true } },
    });
  }

  async create(createBalanceDto: CreateOrUpdateBalanceDto) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const balance = this.repository.create({
          ...new Balance(),
          ...createBalanceDto,
        });

        await manager.save(Balance, balance);
        return balance;
      });

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async update(id: number, updateBalanceDto: CreateOrUpdateBalanceDto) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const balance = await manager.findOne(Balance, { where: { id } });
        if (!balance) {
          return null;
        }

        // Update balance properties
        Object.assign(balance, updateBalanceDto);

        await manager.save(Balance, balance);
        return balance;
      });

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async remove(id: number) {
    try {
      await this.repository.softDelete(id);

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async removeCardsBalances(cardId: number) {
    try {
      await this.repository.softDelete({ cardId: cardId });

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async removePromotionsBalances(promotionId: number) {
    try {
      await this.repository.softDelete({ promotionId: promotionId });

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }
}
