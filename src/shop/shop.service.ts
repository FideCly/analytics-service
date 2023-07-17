import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateOrUpdateShopDto } from "./shop.dto";
import { Shop } from "./shop.entity";

@Injectable()
export class ShopService {
  @InjectRepository(Shop)
  private readonly repository: Repository<Shop>;

  /**
   * Find shop by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOne = (id: number): Promise<Shop | null> => {
    return this.repository.findOneBy({
      id,
    });
  };

  /**
   * Find shop promotions by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOnePromotions = (id: number): Promise<Shop | null> => {
    return this.repository.findOne({
      where: { id },
      relations: { promotions: true },
    });
  };

  /**
   * Find shop clients by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOneClients = (id: number): Promise<Shop | null> => {
    return this.repository.findOne({
      where: { id },
      relations: { cards: { balances: true } },
    });
  };

  /**
   * Create a shop on the db
   * @param createShopDto - The shop to create
   */
  create(createShopDto: CreateOrUpdateShopDto, userId: number): Promise<Shop> {
    const shop = { ...new Shop(), ...createShopDto, userId: userId };
    return this.repository.save(shop);
  }

  /**
   * Update a shop on the db
   * @param id - The shop to update
   * @param updateShopDto - The updated shop
   */
  update(
    id: number,
    updateShopDto: CreateOrUpdateShopDto
  ): Promise<UpdateResult> {
    return this.repository.update(id, updateShopDto);
  }

  /**
   * Delete a shop from the db
   * @param id - The id of the shop to delete
   */
  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
