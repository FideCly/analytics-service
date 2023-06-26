import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { promotionFixture, shopFixture } from "./analytics.fixtures";
import { AppService } from "./app.service";
import { Balance } from "./balance/balance.entity";
import { Card } from "./card/card.entity";
import { Promotion } from "./promotion/promotion.entity";
import { Shop } from "./shop/shop.entity";

describe("AppService", () => {
	let appService: AppService;

	const mockShopRepository = {
		findOne: jest.fn()
	};

	const mockPromotionRepository = {
		findOne: jest.fn()
	};

	const mockCardRepository = {
		find: jest.fn()
	};

	const mockBalanceRepository = {
		find: jest.fn()
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AppService,
				{
					provide: getRepositoryToken(Shop),
					useValue: mockShopRepository
				},
				{
					provide: getRepositoryToken(Promotion),
					useValue: mockPromotionRepository
				},
				{
					provide: getRepositoryToken(Card),
					useValue: mockCardRepository
				},
				{
					provide: getRepositoryToken(Balance),
					useValue: mockBalanceRepository
				}
			]
		}).compile();

		appService = module.get<AppService>(AppService);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getAffluence", () => {
		it("should return an sum of counter in balances", async () => {
			jest.spyOn(mockShopRepository, "findOne").mockResolvedValue(shopFixture);

			const result = await appService.getAffluence({ shopId: 1, startDate: "2023-03-22", endDate: "2023-03-25" });

			expect(result).toEqual({
				status: 200,
				value: 15,
				errors: []
			});
		});

		it("should return an error response if the shop is not found", async () => {
			const result = await appService.getAffluence({ shopId: 3, startDate: "2023-03-22", endDate: "2023-03-25" });

			expect(result).toEqual({
				status: 404,
				value: null,
				errors: ["Shop not found"]
			});
		});

		it("should return an error response if dates are not valid", async () => {
			mockShopRepository.findOne.mockRejectedValueOnce(new Error("test"));

			const result = await appService.getAffluence({ shopId: 1, startDate: "bad_value", endDate: "2023-03-25" });

			expect(result).toEqual({
				status: 500,
				value: null,
				errors: ["Invalid date format"]
			});
		});

		it("should return an error response if there is an error", async () => {
			mockShopRepository.findOne.mockRejectedValueOnce(new Error("test"));

			const result = await appService.getAffluence({ shopId: 1, startDate: "2023-03-22", endDate: "2023-03-25" });

			expect(result).toEqual({
				status: 500,
				value: null,
				errors: [new Error("test")]
			});
		});
	});

	describe("getPromotionCheckoutsCount", () => {
		it("should return the sum of counters in balances for a promotion", async () => {
			mockPromotionRepository.findOne.mockResolvedValueOnce(promotionFixture);

			const result = await appService.getPromotionCheckoutsCount({
				shopId: 1,
				promotionId: 1,
				startDate: "2023-03-22",
				endDate: "2023-03-23"
			});

			expect(result).toEqual({
				status: 200,
				value: 3,
				errors: []
			});
		});

		it("should return an error response if the promotion is not found", async () => {
			mockPromotionRepository.findOne.mockResolvedValueOnce(undefined);

			const result = await appService.getPromotionCheckoutsCount({
				shopId: 1,
				promotionId: 2,
				startDate: "2023-01-01",
				endDate: "2023-01-31"
			});

			expect(mockPromotionRepository.findOne).toHaveBeenCalledWith({
				where: { id: 2, shopId: 1 },
				relations: { balances: true }
			});
			expect(result).toEqual({
				status: 404,
				value: null,
				errors: ["Promotion not found"]
			});
		});

		it("should return an error response if there is an error", async () => {
			mockPromotionRepository.findOne.mockRejectedValueOnce(new Error("test"));

			const result = await appService.getPromotionCheckoutsCount({
				shopId: 1,
				promotionId: 2,
				startDate: "2023-01-01",
				endDate: "2023-01-31"
			});

			expect(mockPromotionRepository.findOne).toHaveBeenCalledWith({
				where: { id: 2, shopId: 1 },
				relations: { balances: true }
			});
			expect(result).toEqual({
				status: 500,
				value: null,
				errors: [new Error("test")]
			});
		});
	});

	describe("getPromotionsRanking", () => {
		it("should return a ranking of promotions based on the sum of counters in balances", async () => {
			mockShopRepository.findOne.mockResolvedValueOnce(shopFixture);

			const result = await appService.getPromotionsRanking({
				shopId: 1,
				startDate: "2023-01-01",
				endDate: "2023-05-31"
			});

			expect(result).toEqual({
				status: 200,
				errors: [],
				promotionNames: ["Mock Promotion 2", "Mock Promotion 1"],
				values: [13, 10]
			});
		});

		it("should return an error response if the shop is not found", async () => {
			mockShopRepository.findOne.mockResolvedValueOnce(undefined);

			const result = await appService.getPromotionsRanking({
				shopId: 1,
				startDate: "2023-01-01",
				endDate: "2023-01-31"
			});

			expect(mockShopRepository.findOne).toHaveBeenCalledWith({
				where: { id: 1 }
			});
			expect(result).toEqual({
				status: 404,
				errors: ["Shop not found"],
				promotionNames: [],
				values: []
			});
		});

		it("should return an error response if there are no promotions", async () => {
			mockShopRepository.findOne.mockResolvedValueOnce({ promotions: [] });

			const result = await appService.getPromotionsRanking({
				shopId: 1,
				startDate: "2023-01-01",
				endDate: "2023-01-31"
			});

			expect(mockShopRepository.findOne).toHaveBeenCalledWith({
				where: { id: 1 }
			});
			expect(result).toEqual({
				status: 404,
				errors: ["Promotions not found"],
				promotionNames: [],
				values: []
			});
		});

		it("should return an error response if there is an error", async () => {
			mockShopRepository.findOne.mockRejectedValueOnce(new Error("test"));

			const result = await appService.getPromotionsRanking({
				shopId: 1,
				startDate: "2023-01-01",
				endDate: "2023-01-31"
			});

			expect(mockShopRepository.findOne).toHaveBeenCalledWith({
				where: { id: 1 }
			});
			expect(result).toEqual({
				status: 500,
				errors: [new Error("test")],
				promotionNames: null,
				values: null
			});
		});
	});

	describe("getClientsCount", () => {
		it("should return the number of users (cards in a shop)", async () => {
			mockShopRepository.findOne.mockResolvedValueOnce(shopFixture);

			const result = await appService.getClientsCount({
				shopId: 1,
				startDate: "2023-01-01",
				endDate: "2023-06-23"
			});

			expect(result).toEqual({
				status: 200,
				errors: [],
				value: 6
			});
		});

		it("should return an error response if the shop is not found", async () => {
			mockShopRepository.findOne.mockResolvedValueOnce(undefined);

			const result = await appService.getClientsCount({
				shopId: 1,
				startDate: "2023-01-01",
				endDate: "2023-01-31"
			});

			expect(result).toEqual({
				status: 404,
				value: null,
				errors: ["Shop not found"]
			});
		});

		it("should return an error response if there is an error", async () => {
			mockShopRepository.findOne.mockRejectedValueOnce(new Error("test"));

			const result = await appService.getClientsCount({
				shopId: 1,
				startDate: "2023-01-01",
				endDate: "2023-01-31"
			});

			expect(mockShopRepository.findOne).toHaveBeenCalledWith({
				where: { id: 1 }
			});
			expect(result).toEqual({
				status: 500,
				value: null,
				errors: [new Error("test")]
			});
		});
	});

	describe("convertDate", () => {
		it("should convert ISO dates to Date objects", () => {
			const result = appService.convertDate("2023-01-01", "2023-01-31");

			expect(result).toEqual({
				startDate: new Date("2023-01-01"),
				endDate: new Date("2023-01-31")
			});
		});
	});
});
