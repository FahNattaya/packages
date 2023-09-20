export const responseMockPaymentsByCampaign = {
	statusCode: 20000,
	statusDesc: 'Success',
	payments: [
		{
			method: 'CC',
			cardType: 'VISA',
			banks: [
				{
					bankAbbr: 'BBL',
					bankDescTh: 'BBL DESC TH',
					bankDescEn: 'BBL DESC EN',
					imageUrl: 'https://../BBL.jpg',
					installments: [
						{
							installmentId: 12345,
							installmentRate: '7',
							installmentTerms: 10,
							balloonMonth: 32,
						},
					],
				},
			],
		},
	],
};

export const responseMockTrade1 = {
	statusCode: 20000,
	stausDecs: 'Success',
	data: {
		prices: [
			{
				includeVat: 25000.0,
				excludeVat: 23250.0,
				vatRate: '7.00',
				priceGroup: 'EUP',
				startDate: '01/01/2023 00: 00: 00',
				endDate: '31/12/2023 23: 59: 59',
			},
		],
		trades: [
			{
				tradeProductId: 146435,
				tradeNo: 'TP21124530',
				tradeName: 'AIS Best Buy 12M (Test Data)',
				packageKeyRef: '8UZfqMT8bItbwuzxILsmQHkpO4EnliZCHg9ANU7IzsAqBjnnfot2QawD0TNBeJk6YrQEjuIsiYaiufsh',
				packageOnTopKeyRef: null,
				minnimumPackagePrice: 599.0,
				maximumPackagePrice: 1199.0,
				simLock: 'Y',
				serviceLockHs: 'P23123456789',
				requireCheckQuota: 'Y',
				requireChangePromotion: false,
				minimumPriceLength: null,
				maximumPriceLength: null,
				maxReceiveFreeGoods: 3,
				contractId: 72,
				durationContract: 12,
				limitContract: 5,
				discount: {
					tradeDiscountId: 145162,
					tradePriceExcludeVat: null,
					tradePriceInCludeVat: null,
					discountExcludeVat: 3000.0,
					discountExcludeBy: 'B',
					specialDiscountIncludeVat: 500.0,
					specialDiscountBy: 'B',
					vatRate: 7.0,
					tradePrivilegeId: 123,
					installmentPartnerFlag: 'Y',
					startDate: '01/01/2023 00: 00: 00',
					endDate: '31/12/2023 23: 59: 59',
				},
				payAdvance: {
					payAdvanceGroupId: 12445,
					priceIncludeVat: 1070.0,
					installmentFlag: 'Y',
					matAirtime: 'AIRTIME_000001',
					description: 'AIRTIME_000001 TEST',
				},
				freegoods: [
					{
						matCode: '52003680',
						name: 'ร่มสีขาว พิมพ์ลาย AIS',
						qty: 1,
					},
					{
						matCode: '52003685',
						name: 'หมวกสีรุ้ง ปัก AIS_Points 2019',
						qty: 1,
					},
				],
				privileges: [
					{
						tradePrivilegeId: 123,
						privilegeId: '2019-00021',
						ussdCode: '*999*035*6#',
					},
				],
				criterias: [
					{
						chargeType: ['Post-paid'],
					},
					{
						criteria: ['Existing'],
					},
					{
						instanceName: ['3G'],
					},
					{
						target: ['AIS'],
					},
				],
			},
		],
	},
};

export const responseMockTrade2 = {
	statusCode: 20000,
	stausDecs: 'Success',
	data: {
		prices: [
			{
				includeVat: 25000.0,
				excludeVat: 23250.0,
				vatRate: '7.00',
				priceGroup: 'EUP',
				startDate: '01/01/2023 00: 00: 00',
				endDate: '31/12/2023 23: 59: 59',
			},
		],
		trades: [
			{
				tradeProductId: 146435,
				tradeNo: 'TP21124530',
				tradeName: 'AIS Best Buy 12M (Test Data)',
				packageKeyRef: '8UZfqMT8bItbwuzxILsmQHkpO4EnliZCHg9ANU7IzsAqBjnnfot2QawD0TNBeJk6YrQEjuIsiYaiufsh',
				packageOnTopKeyRef: null,
				minnimumPackagePrice: 599.0,
				maximumPackagePrice: 1199.0,
				simLock: 'Y',
				serviceLockHs: 'P23123456789',
				requireCheckQuota: 'Y',
				requireChangePromotion: false,
				minimumPriceLength: null,
				maximumPriceLength: null,
				maxReceiveFreeGoods: 3,
				contractId: 72,
				durationContract: 12,
				limitContract: 5,
				discount: {
					tradeDiscountId: 145162,
					tradePriceExcludeVat: null,
					tradePriceInCludeVat: null,
					discountExcludeVat: 3000.0,
					discountExcludeBy: 'B',
					specialDiscountIncludeVat: 500.0,
					specialDiscountBy: 'B',
					vatRate: 7.0,
					tradePrivilegeId: 123,
					installmentPartnerFlag: 'Y',
					startDate: '01/01/2023 00: 00: 00',
					endDate: '31/12/2023 23: 59: 59',
				},
				payAdvance: {
					payAdvanceGroupId: 12445,
					priceIncludeVat: 1070.0,
					installmentFlag: 'Y',
					matAirtime: 'AIRTIME_000001',
					description: 'AIRTIME_000001 TEST',
				},
				freegoods: [
					{
						matCode: '52003680',
						name: 'ร่มสีขาว พิมพ์ลาย AIS',
						qty: 1,
					},
					{
						matCode: '52003685',
						name: 'หมวกสีรุ้ง ปัก AIS_Points 2019',
						qty: 1,
					},
				],
				privileges: [
					{
						tradePrivilegeId: 123,
						privilegeId: '2019-00021',
						ussdCode: '*999*035*6#',
					},
				],
				criterias: [
					{
						chargeType: ['Post-paid'],
					},
					{
						criteria: ['Existing'],
					},
					{
						instanceName: ['3G'],
					},
					{
						target: ['AIS'],
					},
				],
			},
		],
	},
};

export const mockPrivilegeRequest = {
	transactionID: '20003847394757',
	msisdn: '0891191991',
	shortcode: '*545*22*22#',
};

export const mockPrivilegeResponse = {
	data: {
		transactionID: '20003847394757',
		httpStatus: 200,
		status: '20000',
		description: 'SUCCESS',
		msg: '',
	},
};

export const mockCheckDeviceContractResponse = {
	transactionid: '2499',
	httpStatus: 200,
	status: '20000',
	description: 'SUCCESS',
	msisdn: '0818389025',
	privilegeCount: 1,
	privilegeArr: [
		{
			submitTime: '2025/12/12 12:12:12',
			msgBarcode: 'A1B2C3D4',
			usedDate: '',
			ssid: '00000070217021768411',
			ussdNo: '*545*21*81#',
			msg: 'คุณได้สิทธิ์ 22',
		},
	],
};

export const mockCheckDeviceTransactionResponse = {
	data: {
		transactionid: '20003847394757',
		httpStatus: 200,
		status: '20000',
		description: 'SUCCESS',
		msisdn: '0934000624',
		privilegeCount: 2,
		privilegeArr: [
			{
				submitTime: '2023/07/07 17:12:59',
				msgBarcode: '2NE2050076',
				usedDate: '',
				ssid: '202307071712580934000624998374',
				ussdNo: '*999*02#',
				msg: '2NE2050076 พิเศษส่วนลดค่าเครื่องสำหรับลูกค้า AIS รายเดือน',
			},
			{
				submitTime: '2023/07/07 17:11:18',
				msgBarcode: '2NE4575804',
				usedDate: '',
				ssid: '202307071711180934000624087625',
				ussdNo: '*999*02#',
				msg: '2NE4575804 พิเศษส่วนลดค่าเครื่องสำหรับลูกค้า AIS รายเดือน',
			},
		],
	},
};

export const mockPrivilegeBarcodeResponse = {
	transactionID: '20170606131313678',
	status: '20000',
	httpStatus: 200,
	description: 'SUCCESS',
	msg: 'GYU8807701 ไทย AIS Serenade wishes you good luck.\r\nHBD 2U.',
	regId: '657697934',
	msgBarcode: 'GYU8807701',
	barcodeType: '0',
	ssid: '202307041551590934000624959907',
	extUrl: '',
};

export const mockTradePromotionRequest = {
	locationCode: 1100,
	saleChannels: ['ALL AIS', 'BRN', 'ACC'],
	company: 'AWN',
	brand: 'APPLE',
	model: 'IP12PM_128GB',
	color: 'GOLD',
	productType: 'DEVICE',
	productSubtype: 'HANDSET',
	customerGroup: 'Existing',
	campaignId: 1090792,
};

export const mockTradePromotionResponse = {
		"resultCode": "20000",
		"resultDescription": "Success",
		"developerMessage": "Success",
		"data": {
			"prices": [
				{
					"priceGroup": "EUP",
					"includeVat": 39900,
					"excludeVat": 37289.72,
					"vatRate": "7.00",
					"vatAmount": 2610.28,
					"startDate": "01/06/2022 00:00:00"
				},
				{
					"priceGroup": "EUP",
					"includeVat": 39900,
					"excludeVat": 37289.72,
					"vatRate": "7.00",
					"vatAmount": 2610.28,
					"startDate": "18/01/2021 17:44:00"
				},
				{
					"priceGroup": "EUP",
					"includeVat": 39900,
					"excludeVat": 37289.72,
					"vatRate": "7.00",
					"vatAmount": 2610.28,
					"startDate": "01/11/2020 00:00:00"
				}
			],
			"trades": [
				{
					"tradeProductId": 148318,
					"tradeNo": "TP21124530",
					"tradeName": "AIS Best Buy 12M (Test Installment and Compensation)",
					"packageKeyRef": "8UZfqMT8bItbwuzxILsmQHkpO4EnliZCHg9ANU7IzsAqBjnnfot2QawD0TNBeJk6YrQEjuIsiYaiufsh",
					"packageOnTopKeyRef": null,
					"minnimumPackagePrice": 699,
					"maximumPackagePrice": null,
					"simLock": null,
					"serviceLockHs": null,
					"requireCheckQuota": "N",
					"requireChangePromotion": false,
					"minimumPriceLength": null,
					"maximumPriceLength": null,
					"maxReceiveFreeGoods": null,
					"contractId": 72,
					"durationContract": "12",
					"limitContract": 10,
					"discount": {
						"tradeDiscountId": 147372,
						"discountExcludeVat": 2803.74,
						"discountExcludeBy": "B",
						"specialDiscountIncludeVat": null,
						"specialDiscountBy": null,
						"vatRate": "7.00",
						"tradePrivilegeId": 118321,
						"installmentPartnerFlag": null,
						"startDate": "01/02/2019 00:00:00",
						"endDate": "31/12/2024 23:59:00"
					},
					"payAdvance": {
						"payAdvanceGroupId": 0,
						"priceIncludeVat": 0,
						"installmentFlag": "N",
						"matAirtime": null,
						"description": null
					},
					"freegoods": [],
					"privileges": [
						{
							"tradePrivilegeId": 118321,
							"privilegeId": "2019-00021",
							"ussdCode": "*999*035*6#",
							"cashBackFlag": "N"
						}
					],
					"criterias": [
						{
							"chargeType": [
								"Post-paid"
							]
						},
						{
							"criteria": [
								"Existing"
							]
						},
						{
							"instanceName": [
								"3G"
							]
						}
					]
				},
				{
					"tradeProductId": 148329,
					"tradeNo": "TP23075148",
					"tradeName": "AIS Best Buy 12M (Test Payment Leasing Only)",
					"packageKeyRef": "8UZfqMT8bItbwuzxILsmQHkpO4EnliZCHg9ANU7IzsAqBjnnfot2QawD0TNBeJk6YrQEjuIsiYaiufsh",
					"packageOnTopKeyRef": null,
					"minnimumPackagePrice": 899,
					"maximumPackagePrice": null,
					"simLock": null,
					"serviceLockHs": null,
					"requireCheckQuota": "N",
					"requireChangePromotion": false,
					"minimumPriceLength": null,
					"maximumPriceLength": null,
					"maxReceiveFreeGoods": null,
					"contractId": 72,
					"durationContract": "12",
					"limitContract": 10,
					"discount": {
						"tradeDiscountId": 147383,
						"discountExcludeVat": 2803.74,
						"discountExcludeBy": "B",
						"specialDiscountIncludeVat": null,
						"specialDiscountBy": null,
						"vatRate": "7.00",
						"tradePrivilegeId": 118390,
						"installmentPartnerFlag": null,
						"startDate": "01/02/2019 00:00:00",
						"endDate": "31/12/2024 23:59:00"
					},
					"payAdvance": {
						"payAdvanceGroupId": 0,
						"priceIncludeVat": 0,
						"installmentFlag": "N",
						"matAirtime": null,
						"description": null
					},
					"freegoods": [],
					"privileges": [
						{
							"tradePrivilegeId": 118390,
							"privilegeId": "2019-00021",
							"ussdCode": "*999*035*6#",
							"cashBackFlag": "N"
						}
					],
					"criterias": [
						{
							"chargeType": [
								"Post-paid"
							]
						},
						{
							"criteria": [
								"Existing"
							]
						},
						{
							"instanceName": [
								"3G"
							]
						}
					]
				},
				{
					"tradeProductId": 148340,
					"tradeNo": "TP23075149",
					"tradeName": "AIS Best Buy 12M (Test Payment CC Full Only)",
					"packageKeyRef": "8UZfqMT8bItbwuzxILsmQHkpO4EnliZCHg9ANU7IzsAqBjnnfot2QawD0TNBeJk6YrQEjuIsiYaiufsh",
					"packageOnTopKeyRef": null,
					"minnimumPackagePrice": 1199,
					"maximumPackagePrice": null,
					"simLock": null,
					"serviceLockHs": null,
					"requireCheckQuota": "N",
					"requireChangePromotion": false,
					"minimumPriceLength": null,
					"maximumPriceLength": null,
					"maxReceiveFreeGoods": null,
					"contractId": 72,
					"durationContract": "12",
					"limitContract": 10,
					"discount": {
						"tradeDiscountId": 147394,
						"discountExcludeVat": 2803.74,
						"discountExcludeBy": "B",
						"specialDiscountIncludeVat": null,
						"specialDiscountBy": null,
						"vatRate": "7.00",
						"tradePrivilegeId": 118401,
						"installmentPartnerFlag": null,
						"startDate": "01/02/2019 00:00:00",
						"endDate": "31/12/2024 23:59:00"
					},
					"payAdvance": {
						"payAdvanceGroupId": 0,
						"priceIncludeVat": 0,
						"installmentFlag": "N",
						"matAirtime": null,
						"description": null
					},
					"freegoods": [],
					"privileges": [
						{
							"tradePrivilegeId": 118401,
							"privilegeId": "2019-00021",
							"ussdCode": "*999*035*6#",
							"cashBackFlag": "N"
						}
					],
					"criterias": [
						{
							"chargeType": [
								"Post-paid"
							]
						},
						{
							"criteria": [
								"Existing"
							]
						},
						{
							"instanceName": [
								"3G"
							]
						}
					]
				}
			]
		}
	
};


export const mockCampaignPromotionRequest = {
	locationCode: 1100,
	saleChannels: ['ALL AIS', 'BRN', 'ACC'],
	company: 'AWN',
	brand: 'APPLE',
	model: 'IPHONEXSM256',
	color: 'SILVER',
	productType: 'DEVICE',
	productSubtype: 'HANDSET',
	customerGroup: 'Existing',
	offset: 1,
	max: 10,
};

export const mockCampaignPromotionResponse = {
	statusCode: '20000',
	statusDesc: 'Success',
	developerMessage: "Success",
	campaigns: [
		{
			campaignId: 1090792,
			campaignName: 'AIS Best Buy 12M (Test Installment and Compensation)',
			campaignDesc: 'AIS Best Buy 12M_Existing Customer',
			imageUrl: '',
			icon: 'https://www.hotdeal.ais.co.th/assets/images/logohead/logo_head8.png',
			recommendFlag: true,
			payAdvanceFlag: true,
			installmentFlag: true,
			maximumContract: 12,
			customerGroup: 'Existing',
			conditionCode: 'CONDITION_1',
		},
		{
			campaignId: 1090792,
			campaignName: 'AIS Best Buy 12M (Test Installment and Compensation)',
			campaignDesc: 'AIS Best Buy 12M_Existing Customer',
			imageUrl: '',
			icon: 'https://www.hotdeal.ais.co.th/assets/images/logohead/logo_head8.png',
			recommendFlag: true,
			payAdvanceFlag: true,
			installmentFlag: false,
			maximumContract: 12,
			customerGroup: 'Existing',
			conditionCode: 'CONDITION_1',
		}
	]
};

export const mockPaymentsByCampaignRequest = {
	campaignId: 1090383,
	locationCode: '1100',
	saleChannels: ['ALL AIS', 'BRN', 'ACC'],
};

export const mockPaymentsByCampaignResponse = {
	resultCode: '20000',
	resultDescription: 'Success',
	developerMessage: 'Success',
	payments: [
		{
			method: 'CC',
			cardType: 'MASTER',
			banks: [
				{
					bankAbbr: 'BAY',
					bankDescTh: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
					bankDescEn: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
					installments: [
						{
							installmentId: '283',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
						{
							installmentId: '89',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'KTB',
					bankDescTh: 'กรุงไทย จำกัด (มหาชน)',
					bankDescEn: 'KRUNG THAI BANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
					installments: [
						{
							installmentId: '99',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '421',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '157',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'CITI',
					bankDescTh: 'ซิตี้แบงก์',
					bankDescEn: 'CITIBANK N.A.',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITI_CITI.png',
					installments: [
						{
							installmentId: '59',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
						{
							installmentId: '147',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'BBL',
					bankDescTh: 'กรุงเทพ จำกัด (มหาชน)',
					bankDescEn: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
					installments: [
						{
							installmentId: '339',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
						{
							installmentId: '385',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '277',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'FCC',
					bankDescTh: 'บัตรเครดิต เฟิร์สช้อยส์',
					bankDescEn: 'Frist Choice Credit Card',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/FCC_FCC.png',
					installments: [
						{
							installmentId: '173',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '110',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'UOB',
					bankDescTh: 'ยูโอบี จำกัด (มหาชน)',
					bankDescEn: 'UNITED OVERSEAS BANK(THAI)PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOB_UOB-bank.png',
					installments: [
						{
							installmentId: '282',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '17',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'KBNK',
					bankDescTh: 'กสิกรไทย จำกัด (มหาชน)',
					bankDescEn: 'KASIKORNBANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
					installments: [
						{
							installmentId: '371',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
						{
							installmentId: '411',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '96',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
					],
				},
			],
		},
		{
			method: 'CC',
			cardType: 'VISA',
			banks: [
				{
					bankAbbr: 'BBL',
					bankDescTh: 'กรุงเทพ จำกัด (มหาชน)',
					bankDescEn: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
					installments: [
						{
							installmentId: '277',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '339',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
						{
							installmentId: '385',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'UOB',
					bankDescTh: 'ยูโอบี จำกัด (มหาชน)',
					bankDescEn: 'UNITED OVERSEAS BANK(THAI)PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOB_UOB-bank.png',
					installments: [
						{
							installmentId: '282',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '17',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'KTB',
					bankDescTh: 'กรุงไทย จำกัด (มหาชน)',
					bankDescEn: 'KRUNG THAI BANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
					installments: [
						{
							installmentId: '99',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '421',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '157',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'KBNK',
					bankDescTh: 'กสิกรไทย จำกัด (มหาชน)',
					bankDescEn: 'KASIKORNBANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
					installments: [
						{
							installmentId: '371',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
						{
							installmentId: '96',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '411',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'FCC',
					bankDescTh: 'บัตรเครดิต เฟิร์สช้อยส์',
					bankDescEn: 'Frist Choice Credit Card',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/FCC_FCC.png',
					installments: [
						{
							installmentId: '173',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '110',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'BAY',
					bankDescTh: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
					bankDescEn: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
					installments: [
						{
							installmentId: '89',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '283',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'CITI',
					bankDescTh: 'ซิตี้แบงก์',
					bankDescEn: 'CITIBANK N.A.',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITI_CITI.png',
					installments: [
						{
							installmentId: '147',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '59',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
			],
		},
		{
			method: 'CC',
			cardType: 'OTHER',
			banks: [
				{
					bankAbbr: 'KTB',
					bankDescTh: 'กรุงไทย จำกัด (มหาชน)',
					bankDescEn: 'KRUNG THAI BANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
					installments: [
						{
							installmentId: '99',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '421',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '157',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'BAY',
					bankDescTh: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
					bankDescEn: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
					installments: [
						{
							installmentId: '89',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '283',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'BBL',
					bankDescTh: 'กรุงเทพ จำกัด (มหาชน)',
					bankDescEn: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
					installments: [
						{
							installmentId: '277',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '339',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
						{
							installmentId: '385',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'FCC',
					bankDescTh: 'บัตรเครดิต เฟิร์สช้อยส์',
					bankDescEn: 'Frist Choice Credit Card',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/FCC_FCC.png',
					installments: [
						{
							installmentId: '173',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '110',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
				{
					bankAbbr: 'KBNK',
					bankDescTh: 'กสิกรไทย จำกัด (มหาชน)',
					bankDescEn: 'KASIKORNBANK PUBLIC COMPANY LIMITED',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
					installments: [
						{
							installmentId: '96',
							installmentRate: '0',
							installmentTerms: '10',
							balloonMonth: null,
						},
						{
							installmentId: '411',
							installmentRate: '0',
							installmentTerms: '12',
							balloonMonth: null,
						},
						{
							installmentId: '371',
							installmentRate: '0',
							installmentTerms: '6',
							balloonMonth: null,
						},
					],
				},
			],
		},
		{
			method: 'CC',
			cardType: null,
			banks: [],
		},
		{
			method: 'DC',
			cardType: null,
			banks: [],
		},
		{
			method: 'AB',
			cardType: null,
			banks: [],
		},
		{
			method: 'LS',
			cardType: null,
			banks: [],
		},
		{
			method: 'PB',
			cardType: null,
			banks: [],
		},
		{
			method: 'CA',
			cardType: null,
			banks: [],
		},
		{
			method: 'RL',
			cardType: null,
			banks: [],
		},
	],
};