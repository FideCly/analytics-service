import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  GetClientsCountRequestDto,
  GetPromotionsRankingRequestDto,
} from "./analytics.dto";
import { Balance } from "./balance/balance.entity";
import {
  GetAffluenceResponse,
  GetClientsCountResponse,
  GetPromotionCheckoutsCountRequest,
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

  async getAffluence(payload): Promise<GetAffluenceResponse> {
    try {
      const { shopId, startDate, endDate } = payload;

      if (!shopId || !startDate || !endDate) {
        return {
          status: 400,
          value: null,
          errors: ["Missing parameters"],
        } as GetAffluenceResponse;
      }

      if (!this.checkIsoDate(startDate) || !this.checkIsoDate(endDate)) {
        return {
          status: 500,
          value: null,
          errors: ["Invalid date format"],
        } as GetAffluenceResponse;
      }

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

      if (!shop.promotions || shop.promotions.length === 0) {
        return {
          status: 404,
          value: null,
          errors: ["Promotions not found"],
        } as GetAffluenceResponse;
      }

      const promotions = shop.promotions.filter(
        (promotion) => promotion.isActive
      );

      let balances: Balance[] = [];
      for (const promotion of promotions) {
        const promotionBalances = promotion.balances;
        balances = [...balances, ...promotionBalances];
      }

      // filter balances by period
      let filteredBalances: Balance[] = [];
      filteredBalances = balances.filter((balance) => {
        return (
          balance.createdAt.toISOString()?.split("T")?.[0] >=
            payload.startDate &&
          balance.createdAt.toISOString()?.split("T")?.[0] <= payload.endDate
        );
      });

      // sum counter in balances
      const count = filteredBalances.reduce((acc, balance) => {
        return acc + balance.counter;
      }, 0);

      return {
        status: 200,
        value: count,
        errors: [],
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
    payload: GetPromotionCheckoutsCountRequest
  ): Promise<GetPromotionCheckoutsCountResponse> {
    try {
      const { shopId, promotionId, startDate, endDate } = payload;

      if (!shopId || !promotionId || !startDate || !endDate) {
        return {
          status: 400,
          value: null,
          errors: ["Missing parameters"],
        } as GetPromotionCheckoutsCountResponse;
      }

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
        return (
          balance.createdAt.toISOString()?.split("T")?.[0] >=
            payload.startDate &&
          balance.createdAt.toISOString()?.split("T")?.[0] <= payload.endDate
        );
      });

      // sum counter in balances (number)
      const count: number = filteredBalances.reduce((acc, balance) => {
        return acc + balance.counter;
      }, 0);

      return {
        status: 200,
        value: count,
        errors: [],
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
    payload: GetPromotionsRankingRequestDto
  ): Promise<GetPromotionsRankingResponse> {
    try {
      const { shopId, startDate, endDate } = payload;

      if (!shopId || !startDate || !endDate) {
        return {
          status: 400,
          values: [],
          errors: ["Missing parameters"],
        } as GetPromotionsRankingResponse;
      }

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
          return (
            balance.createdAt.toISOString()?.split("T")?.[0] >=
              payload.startDate &&
            balance.createdAt.toISOString()?.split("T")?.[0] <= payload.endDate
          );
        });

        // sum counter in balances
        const count: number = filteredBalances.reduce((acc, balance) => {
          return acc + balance.counter;
        }, 0);

        bestPromotions.push({ name: promotion.name, count: count });
      }

      // sort bestPromotions by countn desc
      bestPromotions.sort((a, b) => {
        return b.count - a.count;
      });

      bestPromotions = bestPromotions;

      return {
        status: 200,
        errors: [],
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
    payload: GetClientsCountRequestDto
  ): Promise<GetClientsCountResponse> {
    try {
      const { shopId, startDate, endDate } = payload;

      if (!shopId || !startDate || !endDate) {
        return {
          status: 400,
          value: null,
          errors: ["Missing parameters"],
        } as GetAffluenceResponse;
      }

      const shop = await this.shopRepository.findOne({
        where: { id: shopId },
      });

      if (!shop) {
        return {
          status: 404,
          value: null,
          errors: ["Shop not found"],
        } as GetClientsCountResponse;
      }

      let cards = shop.cards;

      cards = cards.filter((card) => {
        return (
          card.createdAt.toISOString()?.split("T")?.[0] >= payload.startDate &&
          card.createdAt.toISOString()?.split("T")?.[0] <= payload.endDate
        );
      });

      return {
        status: 200,
        errors: [],
        value: cards.length,
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

  /**
   * checkIsoDate
   * @param isoDate
   * @returns
   * @description check if isoDate is valid
   */
  checkIsoDate(isoDate: string): boolean {
    const regex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    return regex.test(isoDate);
  }
}
