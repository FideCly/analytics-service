import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrUpdateBalanceDto } from './balance.dto';
import { Balance } from './balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private repository: Repository<Balance>,
  ) {}

  findOne(id: number): Promise<Balance | null> {
    return this.repository.findOne({
      where: { id },
      relations: { card: { shop: true } },
    });
  }

  async create(createBalanceDto: CreateOrUpdateBalanceDto) {
    const balance = { ...new Balance(), ...createBalanceDto };
    try {
      await this.repository.save(balance);

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async update(id: number, updateBalanceDto: CreateOrUpdateBalanceDto) {
    try {
      await this.repository.update(id, updateBalanceDto);

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
