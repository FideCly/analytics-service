import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrUpdatePromotionDto } from "./promotion.dto";
import { Promotion } from "./promotion.entity";

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private repository: Repository<Promotion>
  ) {}

  findOne(id: number): Promise<Promotion | null> {
    return this.repository.findOneBy({ id });
  }

  async create(createPromotionDto: CreateOrUpdatePromotionDto, shopId: number) {
    try {
      const promotion = {
        ...new Promotion(),
        ...createPromotionDto,
        shopId: shopId,
      };
      await this.repository.save(promotion);
      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async update(id: number, updatePromotionDto: CreateOrUpdatePromotionDto) {
    try {
      await this.repository.update(id, updatePromotionDto);
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
