export const shopFixture = {
	id: 1,
	name: "Mock Shop",
	promotions: [
		{
			id: 1,
			name: "Mock Promotion 1",
			startDate: new Date("2023-03-22"),
			endDate: new Date("2023-03-25"),
			isActive: true,
			balances: [
				{
					id: 1,
					counter: 1,
					createdAt: new Date("2023-03-22"),
					promotion: {
						id: 1,
						name: "Mock Promotion 1",
						startDate: new Date("2023-03-22"),
						endDate: new Date(new Date("2023-03-25")),
						createdAt: new Date("2023-03-22")
					}
				},
				{
					id: 1,
					counter: 2,
					createdAt: new Date("2023-03-23"),
					promotion: {
						id: 2,
						name: "Mock Promotion 1",
						startDate: new Date("2023-03-22"),
						endDate: new Date("2023-03-25"),
						createdAt: new Date("2023-03-22")
					}
				},
				{
					id: 1,
					counter: 3,
					createdAt: new Date("2023-03-24"),
					promotion: {
						id: 3,
						name: "Mock Promotion 1",
						startDate: new Date("2023-03-22"),
						endDate: new Date("2023-03-25"),
						createdAt: new Date("2023-03-23")
					}
				},
				{
					id: 1,
					counter: 4,
					createdAt: new Date("2023-04-21"),
					promotion: {
						id: 4,
						name: "Mock Promotion 1",
						startDate: new Date("2023-04-25"),
						endDate: new Date("2023-05-27"),
						createdAt: new Date("2023-04-21")
					}
				}
			]
		},
		{
			id: 2,
			name: "Mock Promotion 2",
			startDate: new Date("2023-03-22"),
			endDate: new Date("2023-03-25"),
			isActive: true,
			balances: [
				{
					id: 1,
					counter: 1,
					createdAt: new Date("2023-03-22"),
					promotion: {
						id: 1,
						name: "Mock Promotion 2",
						startDate: new Date("2023-03-22"),
						endDate: new Date(new Date("2023-03-25")),
						createdAt: new Date("2023-03-22")
					}
				},
				{
					id: 1,
					counter: 2,
					createdAt: new Date("2023-03-23"),
					promotion: {
						id: 2,
						name: "Mock Promotion 2",
						startDate: new Date("2023-03-22"),
						endDate: new Date("2023-03-25"),
						createdAt: new Date("2023-03-22")
					}
				},
				{
					id: 1,
					counter: 6,
					createdAt: new Date("2023-03-24"),
					promotion: {
						id: 3,
						name: "Mock Promotion 2",
						startDate: new Date("2023-03-22"),
						endDate: new Date("2023-03-25"),
						createdAt: new Date("2023-03-23")
					}
				},
				{
					id: 1,
					counter: 4,
					createdAt: new Date("2023-04-21"),
					promotion: {
						id: 4,
						name: "Mock Promotion 2",
						startDate: new Date("2023-04-25"),
						endDate: new Date("2023-05-27"),
						createdAt: new Date("2023-04-21")
					}
				}
			]
		}
	],
	cards: [
		{
			id: 1,
			createdAt: new Date("2023-03-22"),
			startAt: new Date("2023-03-22"),
			endAt: new Date("2023-03-25"),
			isActive: true,
			shopId: 1,
			shop: null,
			userId: 1,
			balances: []
		},
		{
			id: 2,
			createdAt: new Date("2023-03-23"),
			startAt: new Date("2023-03-23"),
			endAt: new Date("2023-03-26"),
			isActive: true,
			shopId: 1,
			shop: null,
			userId: 2,
			balances: []
		},
		{
			id: 3,
			createdAt: new Date("2023-03-24"),
			startAt: new Date("2023-03-24"),
			endAt: new Date("2023-03-27"),
			isActive: true,
			shopId: 1,
			shop: null,
			userId: 3,
			balances: []
		},
		{
			id: 4,
			createdAt: new Date("2023-03-25"),
			startAt: new Date("2023-03-25"),
			endAt: new Date("2023-03-28"),
			isActive: true,
			shopId: 1,
			shop: null,
			userId: 4,
			balances: []
		},
		{
			id: 5,
			createdAt: new Date("2023-03-26"),
			startAt: new Date("2023-03-26"),
			endAt: new Date("2023-03-29"),
			isActive: true,
			shopId: 1,
			shop: null,
			userId: 5,
			balances: []
		},
		{
			id: 6,
			createdAt: new Date("2023-03-27"),
			startAt: new Date("2023-03-27"),
			endAt: new Date("2023-03-30"),
			isActive: true,
			shopId: 1,
			shop: null,
			userId: 6,
			balances: []
		}
	]
};

export const promotionFixture = {
	id: 1,
	createdAt: new Date("2023-01-01"),
	name: "Mock Promotion 1",
	startDate: new Date("2023-03-22"),
	endDate: new Date("2023-03-25"),
	isActive: true,
	balances: [
		{
			id: 1,
			counter: 1,
			createdAt: new Date("2023-03-22"),
			promotion: {
				id: 1,
				name: "Mock Promotion 1",
				startDate: new Date("2023-03-22"),
				endDate: new Date("2023-03-25"),
				createdAt: new Date("2023-03-22")
			}
		},
		{
			id: 2,
			counter: 2,

			createdAt: new Date("2023-03-23"),
			promotion: {
				id: 1,
				name: "Mock Promotion 1",
				startDate: new Date("2023-03-22"),
				endDate: new Date("2023-03-25"),
				createdAt: new Date("2023-03-22")
			}
		},
		{
			id: 3,
			counter: 3,
			createdAt: new Date("2023-03-24"),
			promotion: {
				id: 1,
				name: "Mock Promotion 1",
				startDate: new Date("2023-03-22"),
				endDate: new Date("2023-03-25"),
				createdAt: new Date("2023-03-22")
			}
		},
		{
			id: 4,
			counter: 4,
			createdAt: new Date("2023-04-21"),
			promotion: {
				id: 1,
				name: "Mock Promotion 1",
				startDate: new Date("2023-03-22"),
				endDate: new Date("2023-03-25"),
				createdAt: new Date("2023-03-22")
			}
		}
	]
};
