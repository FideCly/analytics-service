import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrUpdatePromotionDto } from "./promotion.dto";
import { Promotion } from "./promotion.entity";

@Injectable()
export class PromotionService {
  @InjectRepository(Promotion)
  private readonly repository: Repository<Promotion>;

  findOne(id: number): Promise<Promotion | null> {
    return this.repository.findOneBy({ id });
  }

  findOneFromShop(id: number, shopId: number): Promise<Promotion | null> {
    return this.repository.findOne({
      where: { id, shopId },
      relations: { balances: true },
    });
  }

  async create(createPromotionDto: CreateOrUpdatePromotionDto) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const promotion = this.repository.create({
          ...new Promotion(),
          ...createPromotionDto,
        });

        await manager.save(Promotion, promotion);
        return promotion;
      });

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async update(id: number, updatePromotionDto: CreateOrUpdatePromotionDto) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const promotion = await manager.findOne(Promotion, { where: { id } });
        if (!promotion) {
          return null;
        }

        // Update promotion properties
        Object.assign(promotion, updatePromotionDto);

        await manager.save(Promotion, promotion);
        return promotion;
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

  async removeShopsPromotions(shopId: number) {
    try {
      await this.repository.softDelete({ shopId: shopId });
      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }
}
