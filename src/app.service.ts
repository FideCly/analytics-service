import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  GetAffluenceResponse,
  GetClientsCountResponse,
  GetPromotionCheckoutsCountResponse,
  GetPromotionsRankingResponse,
} from "./general.pb";
import { Promotion } from "./promotion/promotion.entity";
import { Shop } from "./shop/shop.entity";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Promotion)
    private promotiondRepository: Repository<Promotion>
  ) {}

  async getAffluence(
    shopId: number,
    startDate: string,
    endDate: string
  ): Promise<GetAffluenceResponse> {
    try {
      const periodDate = this.convertDate(startDate, endDate);

      const shop = await this.shopRepository.findOne({
        where: { id: shopId },
      });

      if (!shop) {
        return {
          status: 404,
          value: null,
          errors: ["Shop not found"],
        } as GetAffluenceResponse;
      }

      const promotions = shop.promotions;

      if (!promotions || promotions.length === 0) {
        return {
          status: 404,
          errors: ["Promotions not found"],
          value: null,
        } as GetAffluenceResponse;
      }

      let balances = [];
      for (const promotion of promotions) {
        const promotionBalances = promotion.balances;
        balances = [...balances, ...promotionBalances];
      }

      // filter balances by period
      let filteredBalances = [];
      filteredBalances = balances.filter((balance) => {
        const date = new Date(balance.createdAt);
        return date >= periodDate.startDate && date <= periodDate.endDate;
      });

      // sum counter in balances
      const count = filteredBalances.reduce((acc, balance) => {
        return acc + balance.counter;
      }, 0);

      return {
        status: 200,
        value: count,
        errors: null,
      } as GetAffluenceResponse;
    } catch (error) {
      return {
        status: 500,
        value: null,
        errors: [error],
      } as GetAffluenceResponse;
    }
  }

  /**
   * getCountBalanceByPromotionId
   * @param shopId
   * @param promotionId
   * @param period
   * @returns
   */
  async getPromotionCheckoutsCount(
    shopId: number,
    promotionId: number,
    startDate: string,
    endDate: string
  ): Promise<GetPromotionCheckoutsCountResponse> {
    try {
      const periodDate = this.convertDate(startDate, endDate);

      const promotion = await this.promotiondRepository.findOne({
        where: { id: promotionId, shopId: shopId },
        relations: { balances: true },
      });

      if (!promotion) {
        return {
          status: 404,
          value: null,
          errors: ["Promotion not found"],
        } as GetPromotionCheckoutsCountResponse;
      }

      const balances = promotion.balances;
      let filteredBalances = [];
      filteredBalances = balances.filter((balance) => {
        const date = new Date(balance.createdAt);
        return date >= periodDate.startDate && date <= periodDate.endDate;
      });

      // sum counter in balances
      const count = filteredBalances.reduce((acc, balance) => {
        return acc + balance.counter;
      });

      return {
        status: 200,
        value: count,
        errors: null,
      } as GetPromotionCheckoutsCountResponse;
    } catch (error) {
      return {
        status: 500,
        value: null,
        errors: [error],
      } as GetPromotionCheckoutsCountResponse;
    }
  }

  /**
   * getBestPromotion
   * @param shopId
   * @param period
   * @returns
   */
  async getPromotionsRanking(
    shopId: number,
    startDate: string,
    endDate: string
  ): Promise<GetPromotionsRankingResponse> {
    try {
      const periodDate = this.convertDate(startDate, endDate);

      const shop = await this.shopRepository.findOne({
        where: { id: shopId },
      });

      if (!shop) {
        return {
          status: 404,
          errors: ["Shop not found"],
          promotionNames: [],
          values: [],
        } as GetPromotionsRankingResponse;
      }

      const promotions = shop.promotions;

      if (!promotions || promotions.length === 0) {
        return {
          status: 404,
          errors: ["Promotions not found"],
          promotionNames: [],
          values: [],
        } as GetPromotionsRankingResponse;
      }

      let bestPromotions: { name: string; count: number }[] = [];

      for (const promotion of promotions) {
        // make a ranking of promotions based on the sum of the counters of the balances
        const balances = promotion.balances;
        let filteredBalances = [];
        filteredBalances = balances.filter((balance) => {
          const date = new Date(balance.createdAt);
          return date >= periodDate.startDate && date <= periodDate.endDate;
        });

        // sum counter in balances
        const count = filteredBalances.reduce((acc, balance) => {
          return acc + balance.counter;
        });

        bestPromotions.push({ name: promotion.name, count: count });
      }

      // sort bestPromotions by countn desc
      bestPromotions.sort((a, b) => {
        return b.count - a.count;
      });

      // get only 3 best promotions
      bestPromotions = bestPromotions.slice(0, 3);

      return {
        status: 200,
        errors: null,
        promotionNames: bestPromotions.map((promo) => promo.name),
        values: bestPromotions.map((promo) => promo.count),
      } as GetPromotionsRankingResponse;
    } catch (error) {
      return {
        status: 500,
        errors: [error],
        promotionNames: null,
        values: null,
      } as GetPromotionsRankingResponse;
    }
  }

  /**
   * getClientsByShopId
   * @param shopId
   * @param period
   * @returns
   */
  async getClientsCount(
    shopId: number,
    startDate: string,
    endDate: string
  ): Promise<GetClientsCountResponse> {
    const periodDate = this.convertDate(startDate, endDate);

    try {
      const shop = await this.shopRepository.findOne({
        where: { id: shopId },
      });

      if (!shop) {
        return {
          status: 404,
          errors: ["Shop not found"],
        } as GetClientsCountResponse;
      }

      let cards = shop.cards;

      cards = cards.filter((card) => {
        const date = new Date(card.createdAt);
        return date >= periodDate.startDate && date <= periodDate.endDate;
      });

      let userIds = [];
      for (const card of cards) {
        const userId = card.userId;
        // check if user is not null && if user is not in userIds
        if (!userIds.includes(userId)) {
          userIds = [...userIds, userId];
        }
      }

      return {
        status: 200,
        errors: null,
        value: userIds.length,
      } as GetClientsCountResponse;
    } catch (error) {
      return {
        status: 500,
        value: null,
        errors: [error],
      } as GetClientsCountResponse;
    }
  }

  /**
   * convertDate
   * @param startDate
   * @param endDate
   * @returns
   */
  convertDate(startDate: string, endDate: string) {
    // convert iso date to date
    const start = new Date(startDate);
    const end = new Date(endDate);

    return { startDate: start, endDate: end };
  }
}
