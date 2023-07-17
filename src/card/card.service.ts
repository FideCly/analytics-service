import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrUpdateCardDto } from "./card.dto";
import { Card } from "./card.entity";

@Injectable()
export class CardService {
  @InjectRepository(Card)
  private readonly repository: Repository<Card>;

  async findOne(id: number): Promise<Card | null> {
    return this.repository.findOneBy({ id });
  }

  async create(CreateOrCreateOrUpdateCardDto: CreateOrUpdateCardDto) {
    const card = { ...new Card(), ...CreateOrCreateOrUpdateCardDto };
    try {
      await this.repository.save(card);

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }

  async update(id: number, CreateOrUpdateCardDto: CreateOrUpdateCardDto) {
    try {
      await this.repository.update(id, CreateOrUpdateCardDto);

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

  async removeShopsCards(shopId: number) {
    try {
      await this.repository.softDelete({ shopId: shopId });

      return { status: 200, errors: null };
    } catch (error) {
      return { status: 500, errors: [error] };
    }
  }
}
