import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  shopFixture,
  shopWithEmptyPromotionFixture,
} from "./analytics.fixtures";
import { AppService } from "./app.service";
import { Promotion } from "./promotion/promotion.entity";
import { PromotionService } from "./promotion/promotion.service";
import { Shop } from "./shop/shop.entity";
import { ShopService } from "./shop/shop.service";

describe("AppService", () => {
  let appService: AppService;
  let mockShopRepository: Repository<Shop>;
  let mockPromotionRepository: Repository<Promotion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        ShopService,
        PromotionService,
        {
          provide: getRepositoryToken(Shop),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Promotion),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    mockShopRepository = module.get<Repository<Shop>>(getRepositoryToken(Shop));
    mockPromotionRepository = module.get<Repository<Promotion>>(
      getRepositoryToken(Promotion)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAffluence", () => {
    it("should return an sum of counter in balances", async () => {
      jest
        .spyOn(mockShopRepository, "findOne")
        .mockResolvedValue({ ...(new Shop() as any), ...shopFixture });

      const result = await appService.getAffluence({
        shopId: 1,
        startDate: "2023-03-22",
        endDate: "2023-03-25",
      });

      expect(result).toEqual({
        status: 200,
        value: 15,
        errors: [],
      });
    });

    it("should return an error response if the shop is not found", async () => {
      const result = await appService.getAffluence({
        shopId: 3,
        startDate: "2023-03-22",
        endDate: "2023-03-25",
      });

      expect(result).toEqual({
        status: 404,
        value: null,
        errors: ["Shop not found"],
      });
    });

    it("should return an error response if dates are not valid", async () => {
      jest
        .spyOn(mockShopRepository, "findOne")
        .mockRejectedValueOnce(new Error("test"));

      const result = await appService.getAffluence({
        shopId: 1,
        startDate: "bad_value",
        endDate: "2023-03-25",
      });

      expect(result).toEqual({
        status: 500,
        value: null,
        errors: ["Invalid date format"],
      });
    });

    it("should return an error response if there is an error", async () => {
      jest
        .spyOn(mockShopRepository, "findOne")
        .mockRejectedValueOnce(new Error("test"));

      const result = await appService.getAffluence({
        shopId: 1,
        startDate: "2023-03-22",
        endDate: "2023-03-25",
      });

      expect(result).toEqual({
        status: 500,
        value: null,
        errors: [new Error("test")],
      });
    });
  });

  describe("getPromotionCheckoutsCount", () => {
    it("should return the sum of counters in balances for a promotion", async () => {
      jest.spyOn(mockPromotionRepository, "findOne").mockResolvedValue({
        ...(new Promotion() as any),
        ...shopFixture.promotions[0],
      });

      const result = await appService.getPromotionCheckoutsCount({
        shopId: 1,
        promotionId: 1,
        startDate: "2023-03-22",
        endDate: "2023-03-23",
      });

      expect(result).toEqual({
        status: 200,
        value: 3,
        errors: [],
      });
    });

    it("should return an error response if the promotion is not found...", async () => {
      jest
        .spyOn(mockPromotionRepository, "findOne")
        .mockResolvedValue(undefined);

      const result = await appService.getPromotionCheckoutsCount({
        shopId: 1,
        promotionId: 5,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      });

      expect(result).toEqual({
        status: 200,
        value: 0,
        errors: [],
      });
    });

    it("should return an error response if there is an error", async () => {
      jest
        .spyOn(mockPromotionRepository, "findOne")
        .mockRejectedValueOnce(new Error("test"));

      const result = await appService.getPromotionCheckoutsCount({
        shopId: 1,
        promotionId: 2,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      });

      expect(result).toEqual({
        status: 500,
        value: null,
        errors: [new Error("test")],
      });
    });
  });

  describe("getPromotionsRanking", () => {
    it("should return a ranking of promotions based on the sum of counters in balances", async () => {
      jest
        .spyOn(mockShopRepository, "findOne")
        .mockResolvedValue({ ...(new Shop() as any), ...shopFixture });

      const result = await appService.getPromotionsRanking({
        shopId: 1,
        startDate: "2023-01-01",
        endDate: "2023-05-31",
      });

      expect(result).toEqual({
        status: 200,
        errors: [],
        promotionNames: ["Mock Promotion 2", "Mock Promotion 1"],
        values: [13, 10],
      });
    });

    it("should return an error response if the shop is not found", async () => {
      jest.spyOn(mockShopRepository, "findOne").mockResolvedValue(undefined);

      const result = await appService.getPromotionsRanking({
        shopId: 5,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      });

      expect(result).toEqual({
        status: 404,
        errors: ["Shop not found"],
        promotionNames: [],
        values: [],
      });
    });

    it("should return an error response if there are no promotions", async () => {
      jest.spyOn(mockShopRepository, "findOne").mockResolvedValue({
        ...(new Shop() as any),
        ...shopWithEmptyPromotionFixture,
      });

      const result = await appService.getPromotionsRanking({
        shopId: 9,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      });

      expect(result).toEqual({
        status: 404,
        errors: ["Promotions not found"],
        promotionNames: [],
        values: [],
      });
    });

    it("should return an error response if there is an error", async () => {
      jest
        .spyOn(mockShopRepository, "findOne")
        .mockRejectedValueOnce(new Error("test"));

      const result = await appService.getPromotionsRanking({
        shopId: 1,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      });

      expect(result).toEqual({
        status: 500,
        errors: [new Error("test")],
        promotionNames: null,
        values: null,
      });
    });
  });

  describe("getClientsCount", () => {
    it("should return the number of users (cards in a shop)", async () => {
      jest
        .spyOn(mockShopRepository, "findOne")
        .mockResolvedValue({ ...(new Shop() as any), ...shopFixture });

      const result = await appService.getClientsCount({
        shopId: 1,
        startDate: "2023-01-01",
        endDate: "2023-06-23",
      });

      expect(result).toEqual({
        status: 200,
        errors: [],
        value: 6,
      });
    });

    it("should return an error response if the shop is not found", async () => {
      jest.spyOn(mockShopRepository, "findOne").mockResolvedValue(undefined);

      const result = await appService.getClientsCount({
        shopId: 8,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      });

      expect(result).toEqual({
        status: 404,
        value: null,
        errors: ["Shop not found"],
      });
    });

    it("should return an error response if there is an error", async () => {
      jest
        .spyOn(mockShopRepository, "findOne")
        .mockRejectedValueOnce(new Error("test"));

      const result = await appService.getClientsCount({
        shopId: 1,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      });

      expect(result).toEqual({
        status: 500,
        value: null,
        errors: [new Error("test")],
      });
    });
  });

  describe("convertDate", () => {
    it("should convert ISO dates to Date objects", () => {
      const result = appService.convertDate("2023-01-01", "2023-01-31");

      expect(result).toEqual({
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-31"),
      });
    });
  });
});
