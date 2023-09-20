import { IGetPromotionShelvesResponse } from '../interfaces/cpc.interface';

export const mockGetAllPromotionsByShelfRequest = {
	userId: '1vP1Qbr1T6svJISttRAoZ0y95OsYxxh7bUnfMOAV8LmjpsVStlifT3fquoatH2JUz4LpfsD4tVY2p0LR',
	sanitizedName: 'myChannel-new-care-plus',
	parameters: [
		{
			name: 'title',
			value: 'Change/Replace Device Package',
		},
	],
};
export const mockGetCarePromotionResponse = {
	statusCode: '2000',
	statusDesc: 'SUCCESS',
	data: {
		productType: 'AIS Care Plus',
		service: 'รับประกันสูงสุด 4 ปี',
		protection: [
			{
				name: 'hardware',
				isProtect: true,
			},
			{
				name: 'accident',
				isProtect: true,
			},
			{
				name: 'missing',
				isProtect: true,
			},
		],
		condition: [
			{
				detail: 'บริการเปลี่ยนเครื่อง 25%',
				price: '500',
			},
			{
				detail: 'บริการรับเครื่องทดแทน 42.5%',
				price: '850',
			},
		],
		serviceFee: 'เรียกเก็บตามใบแจ้ง',
		serviceType: {
			title: 'AIS Mobile Care',
			option: [
				{
					name: 'AIS Care Plus รายเดือน 49 บาท',
					price: '49',
				},
				{
					name: 'AIS Care Plus รายเดือน 79 บาท',
					price: '79',
				},
				{
					name: 'AIS Care Plus รายเดือน 139 บาท',
					price: '139',
				},
				{
					name: 'AIS Care Plus รายเดือน 169 บาท',
					price: '169',
				},
				{
					name: 'AIS Care Plus รายเดือน 189 บาท',
					price: '189',
				},
				{
					name: 'AIS Care Plus รายเดือน 259 บาท',
					price: '259',
				},
				{
					name: 'AIS Care Plus รายเดือน 559 บาท',
					price: '559',
				},
				{
					name: 'AIS Care Plus เหมาจ่าย 12 เดือน 1,529 บาท',
					price: '1529',
				},
				{
					name: 'AIS Care Plus เหมาจ่าย 12 เดือน 1,859 บาท',
					price: '1859',
				},
				{
					name: 'AIS Care Plus เหมาจ่าย 12 เดือน 2,079 บาท',
					price: '2079',
				},
				{
					name: 'AIS Care Plus เหมาจ่าย 12 เดือน 2,849 บาท',
					price: '2849',
				},
				{
					name: 'AIS Care Plus เหมาจ่าย 12 เดือน 6,149 บาท',
					price: '6149',
				},
			],
		},
	},
};

export const mockBeforePriceSortingData = [
	{
		id: '002',
		title: 'AIS Care Plus รายเดือน 2000 บาท',
		prototype: 'promotion',
		customAttributes: {
			priceInclVat: '2000',
			priceType: 'One-time',
		},
	},
	{
		id: '003',
		title: 'AIS Care Plus รายเดือน 1800 บาท',
		prototype: 'promotion',
		customAttributes: {
			priceInclVat: '1800',
			priceType: 'Recurring',
		},
	},
	{
		id: '001',
		title: 'AIS Care Plus รายเดือน 169 บาท',
		prototype: 'promotion',
		customAttributes: {
			priceInclVat: '169',
			priceType: 'Recurring',
		},
	},
];

export const mockAfterPriceSortingData = [
	{
		id: '001',
		title: 'AIS Care Plus รายเดือน 169 บาท',
		prototype: 'promotion',
		customAttributes: {
			priceInclVat: '169',
			priceType: 'Recurring',
		},
	},
	{
		id: '003',
		title: 'AIS Care Plus รายเดือน 1800 บาท',
		prototype: 'promotion',
		customAttributes: {
			priceInclVat: '1800',
			priceType: 'Recurring',
		},
	},
	{
		id: '002',
		title: 'AIS Care Plus รายเดือน 2000 บาท',
		prototype: 'promotion',
		customAttributes: {
			priceInclVat: '2000',
			priceType: 'One-time',
		},
	},
];
export const mockGetPromotionShalvesEngResponse: IGetPromotionShelvesResponse = {
	statusCode: '2000',
	statusDesc: 'SUCCESS',
	data: [
		{
			id: '1507143',
			title: 'Change/Replace Device Package',
			titleEn: 'Change/Replace Device Package',
			icon: '',
			sanitizedName: 'myChannel-new-care-plus',
			publish: 'true',
			priority: '0',
			lastUpdated: '1660787671',
			tags: 'NONE',
			type: '',
			conditionCode: '',
			subShelves: [],
			items: [],
		},
	],
};

export const mockGetPromotionShalvesEngAPPLEResponse = {
	statusCode: '2000',
	statusDesc: 'SUCCESS',
	data: [
		{
			id: 1474429,
			title: 'Apple Care+ (AIS Shop)',
			titleEn: '',
			icon: null,
			sanitizedName: 'apple-care-plus-for-ais-shop',
			publish: true,
			priority: 0,
			lastUpdated: 1629451222,
			tags: 'NONE',
			type: null,
			conditionCode: null,
			subShelves: [],
			items: [],
		},
	],
};

export const mockgetAllPromotionsByShelfAPPLEResponse = {
	statusCode: '2000',
	statusDesc: 'Success',
	data: [
		{
			id: '1273456',
			title: 'Apple Care+ มูลค่า 3300 บาท',
			detailTH: 'Apple Care+ มูลค่า 3300 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 3300 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P210808350',
			promotionCode: 'null',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1689066694731',
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				productGroup: 'Apple Care Plus',
				networkType: '3G',
				productPkg: 'Apple Care Plus',
				promotionCode: 'P210808350',
				priceExclVat: '3084.11',
				productClass: 'On-Top Extra',
				numberOfMobile: '0',
				productType: 'Promotion',
				shortNameEng: 'Apple Care+ 3300 Baht',
				promotionName: 'Apple Care Plus 3300 Baht',
				inStatementEng: 'Apple Care+ 3300 Baht (Included vat)',
				isPortIn: 'false',
				durationType: 'Month_Midnight',
				shortNameThai: 'Apple Care+ มูลค่า 3300 บาท',
				isChangeChargeType: 'false',
				priceInclVat: '3300',
				promotionFee: '3084.11',
				classAttributeName: 'Apple Care Plus Class',
				isNewRegistration: 'true',
				inStatementThai: 'Apple Care+ มูลค่า 3300 บาท (รวมภาษีมูลค่าเพิ่ม)',
				orderType: 'New Registration,Change Promotion,Change Service',
				isChangeService: 'true',
				effectiveEndDt: '2027-12-31',
				priceType: 'One-Time',
				descriptionThai: 'Apple Care+ มูลค่า 3300 บาท (รวมภาษีมูลค่าเพิ่ม)',
				prorateFlg: 'N',
				billingSystem: 'IRB',
				duration: '24',
				statusCd: 'Active',
				chargeType: 'All',
				effectiveStartDt: '2016-06-04',
				isChangePromotion: 'true',
				classAttributeDisplayName: 'Apple Care Plus Class',
				imeiFlg: 'N',
				descriptionEng: 'Apple Care+ 3300 Baht (Included vat)',
				gprsType: 'Volume-Based',
				isRenew: 'false',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '3084.11',
				priceIncVat: '3300',
				irCountry: '',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1273459',
			title: 'Apple Care+ มูลค่า 6200 บาท',
			detailTH: 'Apple Care+ มูลค่า 6200 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 6200 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P210808353',
			promotionCode: 'null',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1689066697146',
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				productGroup: 'Apple Care Plus',
				networkType: '3G',
				productPkg: 'Apple Care Plus',
				promotionCode: 'P210808353',
				priceExclVat: '5794.39',
				productClass: 'On-Top Extra',
				numberOfMobile: '0',
				productType: 'Promotion',
				shortNameEng: 'Apple Care+ 6200 Baht',
				promotionName: 'Apple Care Plus 6200 Baht',
				inStatementEng: 'Apple Care+ 6200 Baht (Included vat)',
				isPortIn: 'false',
				durationType: 'Month_Midnight',
				shortNameThai: 'Apple Care+ มูลค่า 6200 บาท',
				isChangeChargeType: 'false',
				priceInclVat: '6200',
				promotionFee: '5794.39',
				classAttributeName: 'Apple Care Plus Class',
				isNewRegistration: 'true',
				inStatementThai: 'Apple Care+ มูลค่า 6200 บาท (รวมภาษีมูลค่าเพิ่ม)',
				orderType: 'New Registration,Change Promotion,Change Service',
				isChangeService: 'true',
				priceType: 'One-Time',
				descriptionThai: 'Apple Care+ มูลค่า 6200 บาท (รวมภาษีมูลค่าเพิ่ม)',
				prorateFlg: 'N',
				billingSystem: 'All',
				duration: '24',
				statusCd: 'Active',
				effectiveStartDt: '2021-09-07',
				chargeType: 'All',
				isChangePromotion: 'true',
				gprsType: 'Volume-Based',
				descriptionEng: 'Apple Care+ 6200 Baht (Included vat)',
				imeiFlg: 'N',
				classAttributeDisplayName: 'Apple Care Plus Class',
				isRenew: 'false',
				effectiveEndDt: '2030-12-31',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				irCountry: '',
				priceExcVat: '5794.39',
				priceIncVat: '6200',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1275614',
			title: 'Apple Care+ มูลค่า 5990 บาท',
			detailTH: 'Apple Care+ มูลค่า 5990 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 5990 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P211009349',
			promotionCode: 'null',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1689066798802',
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				isNewRegistration: 'true',
				isChangeChargeType: 'false',
				isPortIn: 'false',
				orderType: 'Change Promotion,Change Service,New Registration',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P211009349',
				promotionName: 'Apple Care Plus 5990 Baht',
				shortNameEng: 'Apple Care+ 5990 Baht',
				shortNameThai: 'Apple Care+ มูลค่า 5990 บาท',
				promotionFee: '5598.13',
				priceExclVat: '5598.13',
				productClass: 'On-Top Extra',
				productGroup: 'Apple Care Plus',
				productPkg: 'Apple Care Plus',
				descriptionThai: 'Apple Care+ มูลค่า 5990 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'Apple Care+ 5990 Baht (Included vat)',
				inStatementThai: 'Apple Care+ มูลค่า 5990 บาท (รวมภาษีมูลค่าเพิ่ม)',
				inStatementEng: 'Apple Care+ 5990 Baht (Included vat)',
				numberOfMobile: '0',
				gprsType: 'Volume-Based',
				effectiveStartDt: '2021-10-27',
				effectiveEndDt: '2027-12-31',
				statusCd: 'Active',
				duration: '24',
				durationType: 'Month_Midnight',
				priceInclVat: '5990',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Apple Care Plus Class',
				classAttributeDisplayName: 'Apple Care Plus Class',
				prorateFlg: 'N',
				isChangePromotion: 'true',
				isChangeService: 'true',
				isRenew: 'false',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '5598.13',
				priceIncVat: '5990',
				irCountry: '',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1275615',
			title: 'Apple Care+ มูลค่า 8290 บาท',
			detailTH: 'Apple Care+ มูลค่า 8290 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 8290 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P211009350',
			promotionCode: 'null',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1689066799759',
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				inStatementThai: 'Apple Care+ มูลค่า 8290 บาท (รวมภาษีมูลค่าเพิ่ม)',
				inStatementEng: 'Apple Care+ 8290 Baht (Included vat)',
				numberOfMobile: '0',
				gprsType: 'Volume-Based',
				effectiveStartDt: '2021-10-27',
				effectiveEndDt: '2027-12-31',
				statusCd: 'Active',
				duration: '24',
				durationType: 'Month_Midnight',
				priceInclVat: '8290',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Apple Care Plus Class',
				classAttributeDisplayName: 'Apple Care Plus Class',
				prorateFlg: 'N',
				isChangePromotion: 'true',
				isChangeService: 'true',
				descriptionEng: 'Apple Care+ 8290 Baht (Included vat)',
				isChangeChargeType: 'false',
				isPortIn: 'false',
				orderType: 'Change Promotion,Change Service',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P211009350',
				promotionName: 'Apple Care Plus 8290 Baht',
				shortNameEng: 'Apple Care+ 8290 Baht',
				shortNameThai: 'Apple Care+ มูลค่า 8290 บาท',
				promotionFee: '7747.66',
				priceExclVat: '7747.66',
				productClass: 'On-Top Extra',
				productGroup: 'Apple Care Plus',
				productPkg: 'Apple Care Plus',
				descriptionThai: 'Apple Care+ มูลค่า 8290 บาท (รวมภาษีมูลค่าเพิ่ม)',
				isNewRegistration: 'false',
				isRenew: 'false',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '7747.66',
				priceIncVat: '8290',
				irCountry: '',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1307198',
			title: 'Apple Care Plus มูลค่า 6490 บาท',
			detailTH: 'Apple Care Plus มูลค่า 6490 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care Plus 6490 Baht (Included vat)',
			thumbnail: 'c44928cb-0c92-4d37-bcf2-679912729d53.jpg',
			feedItemId: 'P220915039',
			promotionCode: 'P220915039',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '9999',
			lastUpdated: '1689066892523',
			prototype: 'digital',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'false',
				isPortIn: 'false',
				orderType: 'Change Promotion,Change Service',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P220915039',
				promotionName: 'Apple Care Plus 6490 Baht',
				shortNameEng: 'Apple Care Plus 6490 Baht',
				shortNameThai: 'Apple Care Plus มูลค่า 6490 บาท',
				promotionFee: '6065.42',
				productClass: 'On-Top Extra',
				productGroup: 'Apple Care Plus',
				productPkg: 'Apple Care Plus',
				descriptionThai: 'Apple Care Plus มูลค่า 6490 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'Apple Care Plus 6490 Baht (Included vat)',
				inStatementThai: 'Apple Care Plus มูลค่า 6490 บาท (รวมภาษีมูลค่าเพิ่ม)',
				inStatementEng: 'Apple Care Plus 6490 Baht (Included vat)',
				bvPoint: '',
				bvDescription: '',
				numberOfMobile: '0',
				externalMsg: '',
				gprsType: 'Volume-Based',
				bosProdId: '',
				effectiveStartDt: '2022-09-14',
				effectiveEndDt: '2027-12-31',
				statusCd: 'Active',
				duration: '24',
				durationType: 'Month_Midnight',
				priceExclVat: '6065.42',
				priceExcVat: '6065.42',
				priceInclVat: '6489.9994',
				priceIncVat: '6489.9994',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Apple Care Plus Class',
				classAttributeDisplayName: 'Apple Care Plus Class',
				irCountry: '',
				prorateFlg: 'N',
				isChangePromotion: 'true',
				isChangeService: 'true',
				isRenew: 'false',
				parameters: [],
			},
			accountFees: [],
			orderFees: [],
		},
	],
};

export const mockGetPromotionShalvesThResponse: IGetPromotionShelvesResponse = {
	statusCode: '2000',
	statusDesc: 'SUCCESS',
	data: [
		{
			id: '1507143',
			title: 'แพ็กเกจเปลี่ยนเครื่อง/รับเครื่องทดแทน',
			titleEn: 'Change/Replace Device Package',
			icon: 'null',
			sanitizedName: 'myChannel-new-care-plus',
			publish: 'true',
			priority: '0',
			lastUpdated: '1660787671',
			tags: 'NONE',
			type: 'null',
			conditionCode: 'null',
			subShelves: [],
			items: [],
		},
	],
};

export const mockGetAllPromotionsByShalvesResponse = {
	statusCode: '2000',
	statusDesc: 'Success',
	data: [
		{
			id: 1273456,
			title: 'Apple Care+ มูลค่า 3300 บาท',
			detailTH: 'Apple Care+ มูลค่า 3300 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 3300 Baht (Included vat)',
			thumbnail: null,
			feedItemId: 'P210808350',
			promotionCode: null,
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 0,
			lastUpdated: 1689216115120,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				productGroup: 'Apple Care Plus',
				networkType: '3G',
				productPkg: 'Apple Care Plus',
				promotionCode: 'P210808350',
				priceExclVat: '3084.11',
				productClass: 'On-Top Extra',
				numberOfMobile: '0',
				productType: 'Promotion',
				shortNameEng: 'Apple Care+ 3300 Baht',
				promotionName: 'Apple Care Plus 3300 Baht',
				inStatementEng: 'Apple Care+ 3300 Baht (Included vat)',
				isPortIn: 'false',
				durationType: 'Month_Midnight',
				shortNameThai: 'Apple Care+ มูลค่า 3300 บาท',
				isChangeChargeType: 'false',
				priceInclVat: '3300',
				promotionFee: '3084.11',
				classAttributeName: 'Apple Care Plus Class',
				isNewRegistration: 'true',
				inStatementThai: 'Apple Care+ มูลค่า 3300 บาท (รวมภาษีมูลค่าเพิ่ม)',
				orderType: 'New Registration,Change Promotion,Change Service',
				isChangeService: 'true',
				effectiveEndDt: '2027-12-31',
				priceType: 'One-Time',
				descriptionThai: 'Apple Care+ มูลค่า 3300 บาท (รวมภาษีมูลค่าเพิ่ม)',
				prorateFlg: 'N',
				billingSystem: 'IRB',
				duration: '24',
				statusCd: 'Active',
				chargeType: 'All',
				effectiveStartDt: '2016-06-04',
				isChangePromotion: 'true',
				classAttributeDisplayName: 'Apple Care Plus Class',
				imeiFlg: 'N',
				descriptionEng: 'Apple Care+ 3300 Baht (Included vat)',
				gprsType: 'Volume-Based',
				isRenew: 'false',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '3084.11',
				priceIncVat: '3300',
				irCountry: '',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: 1273459,
			title: 'Apple Care+ มูลค่า 6200 บาท',
			detailTH: 'Apple Care+ มูลค่า 6200 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 6200 Baht (Included vat)',
			thumbnail: null,
			feedItemId: 'P210808353',
			promotionCode: null,
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 0,
			lastUpdated: 1689216117377,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				productGroup: 'Apple Care Plus',
				networkType: '3G',
				productPkg: 'Apple Care Plus',
				promotionCode: 'P210808353',
				priceExclVat: '5794.39',
				productClass: 'On-Top Extra',
				numberOfMobile: '0',
				productType: 'Promotion',
				shortNameEng: 'Apple Care+ 6200 Baht',
				promotionName: 'Apple Care Plus 6200 Baht',
				inStatementEng: 'Apple Care+ 6200 Baht (Included vat)',
				isPortIn: 'false',
				durationType: 'Month_Midnight',
				shortNameThai: 'Apple Care+ มูลค่า 6200 บาท',
				isChangeChargeType: 'false',
				priceInclVat: '6200',
				promotionFee: '5794.39',
				classAttributeName: 'Apple Care Plus Class',
				isNewRegistration: 'true',
				inStatementThai: 'Apple Care+ มูลค่า 6200 บาท (รวมภาษีมูลค่าเพิ่ม)',
				orderType: 'New Registration,Change Promotion,Change Service',
				isChangeService: 'true',
				priceType: 'One-Time',
				descriptionThai: 'Apple Care+ มูลค่า 6200 บาท (รวมภาษีมูลค่าเพิ่ม)',
				prorateFlg: 'N',
				billingSystem: 'All',
				duration: '24',
				statusCd: 'Active',
				effectiveStartDt: '2021-09-07',
				chargeType: 'All',
				isChangePromotion: 'true',
				gprsType: 'Volume-Based',
				descriptionEng: 'Apple Care+ 6200 Baht (Included vat)',
				imeiFlg: 'N',
				classAttributeDisplayName: 'Apple Care Plus Class',
				isRenew: 'false',
				effectiveEndDt: '2030-12-31',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				irCountry: '',
				priceExcVat: '5794.39',
				priceIncVat: '6200',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: 1275614,
			title: 'Apple Care+ มูลค่า 5990 บาท',
			detailTH: 'Apple Care+ มูลค่า 5990 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 5990 Baht (Included vat)',
			thumbnail: null,
			feedItemId: 'P211009349',
			promotionCode: null,
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 0,
			lastUpdated: 1689216193718,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				isNewRegistration: 'true',
				isChangeChargeType: 'false',
				isPortIn: 'false',
				orderType: 'Change Promotion,Change Service,New Registration',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P211009349',
				promotionName: 'Apple Care Plus 5990 Baht',
				shortNameEng: 'Apple Care+ 5990 Baht',
				shortNameThai: 'Apple Care+ มูลค่า 5990 บาท',
				promotionFee: '5598.13',
				priceExclVat: '5598.13',
				productClass: 'On-Top Extra',
				productGroup: 'Apple Care Plus',
				productPkg: 'Apple Care Plus',
				descriptionThai: 'Apple Care+ มูลค่า 5990 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'Apple Care+ 5990 Baht (Included vat)',
				inStatementThai: 'Apple Care+ มูลค่า 5990 บาท (รวมภาษีมูลค่าเพิ่ม)',
				inStatementEng: 'Apple Care+ 5990 Baht (Included vat)',
				numberOfMobile: '0',
				gprsType: 'Volume-Based',
				effectiveStartDt: '2021-10-27',
				effectiveEndDt: '2027-12-31',
				statusCd: 'Active',
				duration: '24',
				durationType: 'Month_Midnight',
				priceInclVat: '5990',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Apple Care Plus Class',
				classAttributeDisplayName: 'Apple Care Plus Class',
				prorateFlg: 'N',
				isChangePromotion: 'true',
				isChangeService: 'true',
				isRenew: 'false',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '5598.13',
				priceIncVat: '5990',
				irCountry: '',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: 1275615,
			title: 'Apple Care+ มูลค่า 8290 บาท',
			detailTH: 'Apple Care+ มูลค่า 8290 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care+ 8290 Baht (Included vat)',
			thumbnail: null,
			feedItemId: 'P211009350',
			promotionCode: null,
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 0,
			lastUpdated: 1689216194412,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'false',
				inStatementThai: 'Apple Care+ มูลค่า 8290 บาท (รวมภาษีมูลค่าเพิ่ม)',
				inStatementEng: 'Apple Care+ 8290 Baht (Included vat)',
				numberOfMobile: '0',
				gprsType: 'Volume-Based',
				effectiveStartDt: '2021-10-27',
				effectiveEndDt: '2027-12-31',
				statusCd: 'Active',
				duration: '24',
				durationType: 'Month_Midnight',
				priceInclVat: '8290',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Apple Care Plus Class',
				classAttributeDisplayName: 'Apple Care Plus Class',
				prorateFlg: 'N',
				isChangePromotion: 'true',
				isChangeService: 'true',
				descriptionEng: 'Apple Care+ 8290 Baht (Included vat)',
				isChangeChargeType: 'false',
				isPortIn: 'false',
				orderType: 'Change Promotion,Change Service',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P211009350',
				promotionName: 'Apple Care Plus 8290 Baht',
				shortNameEng: 'Apple Care+ 8290 Baht',
				shortNameThai: 'Apple Care+ มูลค่า 8290 บาท',
				promotionFee: '7747.66',
				priceExclVat: '7747.66',
				productClass: 'On-Top Extra',
				productGroup: 'Apple Care Plus',
				productPkg: 'Apple Care Plus',
				descriptionThai: 'Apple Care+ มูลค่า 8290 บาท (รวมภาษีมูลค่าเพิ่ม)',
				isNewRegistration: 'false',
				isRenew: 'false',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '7747.66',
				priceIncVat: '8290',
				irCountry: '',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: 1307198,
			title: 'Apple Care Plus มูลค่า 6490 บาท',
			detailTH: 'Apple Care Plus มูลค่า 6490 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'Apple Care Plus 6490 Baht (Included vat)',
			thumbnail: 'c44928cb-0c92-4d37-bcf2-679912729d53.jpg',
			feedItemId: 'P220915039',
			promotionCode: 'P220915039',
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 9999,
			lastUpdated: 1689216284047,
			prototype: 'digital',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'false',
				isPortIn: 'false',
				orderType: 'Change Promotion,Change Service',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P220915039',
				promotionName: 'Apple Care Plus 6490 Baht',
				shortNameEng: 'Apple Care Plus 6490 Baht',
				shortNameThai: 'Apple Care Plus มูลค่า 6490 บาท',
				promotionFee: '6065.42',
				productClass: 'On-Top Extra',
				productGroup: 'Apple Care Plus',
				productPkg: 'Apple Care Plus',
				descriptionThai: 'Apple Care Plus มูลค่า 6490 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'Apple Care Plus 6490 Baht (Included vat)',
				inStatementThai: 'Apple Care Plus มูลค่า 6490 บาท (รวมภาษีมูลค่าเพิ่ม)',
				inStatementEng: 'Apple Care Plus 6490 Baht (Included vat)',
				bvPoint: '',
				bvDescription: '',
				numberOfMobile: '0',
				externalMsg: '',
				gprsType: 'Volume-Based',
				bosProdId: '',
				effectiveStartDt: '2022-09-14',
				effectiveEndDt: '2027-12-31',
				statusCd: 'Active',
				duration: '24',
				durationType: 'Month_Midnight',
				priceExclVat: '6065.42',
				priceExcVat: '6065.42',
				priceInclVat: '6489.9994',
				priceIncVat: '6489.9994',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Apple Care Plus Class',
				classAttributeDisplayName: 'Apple Care Plus Class',
				irCountry: '',
				prorateFlg: 'N',
				isChangePromotion: 'true',
				isChangeService: 'true',
				isRenew: 'false',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AgreementNumber',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'AppleCareSalesDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CancellationDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'CoverageDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Email',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'HardwareShipDate',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'MRCFlag',
							},
							{
								Name: 'attributeValue',
								Value: 'N',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'PurchaseOrder',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'ReceiptNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SerialNo',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'SharedPrice',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'Y',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
	],
};

export const mockBodyProductSelling = {
	handsetPrice: '25000',
	productName: 'iPhone 12',
	language: 'TH',
	projectGroup: 'APPLE',
	productType: 'DEVICE',
	productSubType: 'HANDSET',
	brand: 'APPLE',
	model: 'IP12P_128GB',
	matCode: '',
	activeDate: '',
};

export const mockProductCrossSellingResponse = {
	resultCode: '20000',
	resultDescription: 'Success',
	developerMessage: 'Success',
	listMainProduct: [
		{
			upsaleMstId: '32',
			projectGroup: 'APPLE CARE PLUS',
			productType: 'DEVICE',
			productSubType: 'HANDSET',
			brand: 'APPLE',
			model: 'IP12P_128GB',
			category: 'iPhone',
			listCrossProduct: [
				{
					upsaleDtlId: '59',
					upsaleMstId: '32',
					itemNo: '1',
					crossProductType: 'SERVICE',
					crossProductSubType: 'APPLECARE',
					crossMatCode: 'APPLECAREPLUS6200',
					startDt: '01/10/2021',
					swapPrice: '1400',
					replacePrice: '5900',
					cost: '12000',
					lastUpdBy: 'wisachae',
					priceIncVat: '6200.00',
					priceExcVat: '5794.39',
					vatAmt: '405.61',
				},
			],
		},
	],
};

export const mockSortedGetAllPromotionsByShalvesResponse = {
	statusCode: '2000',
	statusDesc: 'SUCCESS',
	data: [
		{
			id: '1281502',
			title: 'AIS Care Plus รายเดือน 49 บาท',
			detailTH: 'AIS Care Plus รายเดือน มูลค่า 49 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'AIS Care Plus Monthly 49 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P220814345',
			promotionCode: 'P220814345',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1688635033638',
			prototype: 'mobile_care',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'true',
				isPortIn: 'false',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB,CBS',
				networkType: '3G',
				promotionCode: 'P220814345',
				promotionName: 'Care Plus 49Baht Monthly',
				shortNameEng: 'AIS Care Plus (Monthly) 49 Baht',
				shortNameThai: 'AIS Care Plus รายเดือน 49 บาท',
				promotionFee: '45.79',
				priceExclVat: '45.79',
				productClass: 'On-Top Extra',
				productGroup: 'Mobile Care',
				productPkg: 'Mobile Care Bundle',
				descriptionThai: 'AIS Care Plus รายเดือน มูลค่า 49 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'AIS Care Plus Monthly 49 Baht (Included vat)',
				inStatementThai: 'AIS Care Plus รายเดือน มูลค่า 49 บาท',
				inStatementEng: 'AIS Care Plus Monthly 49 Baht',
				numberOfMobile: '0',
				gprsType: 'N/A',
				effectiveStartDt: '2017-06-01',
				effectiveEndDt: '2024-01-31',
				statusCd: 'Active',
				duration: '48',
				durationType: 'Month_Midnight',
				priceInclVat: '49',
				priceType: 'Recurring',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Mobile Care Class',
				classAttributeDisplayName: 'Mobile Care Class',
				prorateFlg: 'N',
				startDevicePrice: '2000',
				endDevicePrice: '5000',
				packageType: 'Replace',
				offerType: 'Standard',
				orderType: 'Change Charge Type,Change Promotion,Change Service',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '45.79',
				priceIncVat: '49',
				irCountry: '',
				isRenew: 'false',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'endDt',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'discountFlag',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'price',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'IMEI',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Prepaid Start date',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'serviceItemIntegrationId',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1281504',
			title: 'AIS Care Plus รายเดือน 79 บาท',
			detailTH: 'AIS Care Plus รายเดือน มูลค่า 79 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'AIS Care Plus Monthly 79 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P220814346',
			promotionCode: 'P220814346',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1688635035306',
			prototype: 'mobile_care',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'false',
				isPortIn: 'false',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB,CBS',
				networkType: '3G',
				promotionCode: 'P220814346',
				promotionName: 'Care Plus 79Baht Monthly',
				shortNameEng: 'AIS Care Plus (Monthly) 79 Baht',
				shortNameThai: 'AIS Care Plus รายเดือน 79 บาท',
				promotionFee: '73.83',
				priceExclVat: '73.83',
				productClass: 'On-Top Extra',
				productGroup: 'Mobile Care',
				productPkg: 'Mobile Care Bundle',
				descriptionThai: 'AIS Care Plus รายเดือน มูลค่า 79 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'AIS Care Plus Monthly 79 Baht (Included vat)',
				inStatementThai: 'AIS Care Plus รายเดือน มูลค่า 79 บาท',
				inStatementEng: 'AIS Care Plus Monthly 79 Baht',
				numberOfMobile: '0',
				gprsType: 'N/A',
				effectiveStartDt: '2022-08-15',
				effectiveEndDt: '2024-01-31',
				statusCd: 'Active',
				duration: '48',
				durationType: 'Month_Midnight',
				priceInclVat: '79',
				priceType: 'Recurring',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Mobile Care Class',
				classAttributeDisplayName: 'Mobile Care Class',
				prorateFlg: 'N',
				startDevicePrice: '5001',
				endDevicePrice: '10000',
				packageType: 'Replace',
				offerType: 'Standard',
				orderType: 'Change Promotion,Change Service',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '73.83',
				priceIncVat: '79',
				irCountry: '',
				isRenew: 'false',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'endDt',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'discountFlag',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'price',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'IMEI',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Prepaid Start date',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'serviceItemIntegrationId',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1281497',
			title: 'AIS Care Plus รายเดือน 189 บาท',
			detailTH: 'AIS Care Plus รายเดือน มูลค่า 189 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'AIS Care Plus Monthly 189 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P220814349',
			promotionCode: 'P220814349',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1688635031132',
			prototype: 'mobile_care',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'true',
				isPortIn: 'false',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB,CBS',
				networkType: '3G',
				promotionCode: 'P220814349',
				promotionName: 'Care Plus 189Baht Monthly',
				shortNameEng: 'AIS Care Plus (Monthly) 189 Baht',
				shortNameThai: 'AIS Care Plus รายเดือน 189 บาท',
				promotionFee: '176.64',
				priceExclVat: '176.64',
				productClass: 'On-Top Extra',
				productGroup: 'Mobile Care',
				productPkg: 'Mobile Care Bundle',
				descriptionThai: 'AIS Care Plus รายเดือน มูลค่า 189 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'AIS Care Plus Monthly 189 Baht (Included vat)',
				inStatementThai: 'AIS Care Plus รายเดือน มูลค่า 189 บาท',
				inStatementEng: 'AIS Care Plus Monthly 189 Baht',
				numberOfMobile: '0',
				gprsType: 'N/A',
				effectiveStartDt: '2022-08-15',
				effectiveEndDt: '2024-01-31',
				statusCd: 'Active',
				duration: '48',
				durationType: 'Month_Midnight',
				priceInclVat: '189',
				priceType: 'Recurring',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Mobile Care Class',
				classAttributeDisplayName: 'Mobile Care Class',
				prorateFlg: 'N',
				startDevicePrice: '30001',
				endDevicePrice: '40000',
				packageType: 'Replace',
				offerType: 'Standard',
				orderType: 'Change Charge Type,Change Promotion,Change Service',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '176.64',
				priceIncVat: '189',
				irCountry: '',
				isRenew: 'false',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'endDt',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'discountFlag',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'price',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'IMEI',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Prepaid Start date',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'serviceItemIntegrationId',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1281499',
			title: 'AIS Care Plus รายเดือน 259 บาท',
			detailTH: 'AIS Care Plus รายเดือน มูลค่า 259 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'AIS Care Plus Monthly 259 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P220814350',
			promotionCode: 'P220814350',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1688635041564',
			prototype: 'mobile_care',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'true',
				isPortIn: 'false',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB,CBS',
				networkType: '3G',
				promotionCode: 'P220814350',
				promotionName: 'Care Plus 259Baht Monthly',
				shortNameEng: 'AIS Care Plus (Monthly) 259 Baht',
				shortNameThai: 'AIS Care Plus รายเดือน 259 บาท',
				promotionFee: '242.06',
				priceExclVat: '242.06',
				productClass: 'On-Top Extra',
				productGroup: 'Mobile Care',
				productPkg: 'Mobile Care Bundle',
				descriptionThai: 'AIS Care Plus รายเดือน มูลค่า 259 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'AIS Care Plus Monthly 259 Baht (Included vat)',
				inStatementThai: 'AIS Care Plus รายเดือน มูลค่า 259 บาท',
				inStatementEng: 'AIS Care Plus Monthly 259 Baht',
				numberOfMobile: '0',
				gprsType: 'N/A',
				effectiveStartDt: '2015-04-01',
				effectiveEndDt: '2024-01-31',
				statusCd: 'Active',
				duration: '48',
				durationType: 'Month_Midnight',
				priceInclVat: '259',
				priceType: 'Recurring',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Mobile Care Class',
				classAttributeDisplayName: 'Mobile Care Class',
				prorateFlg: 'N',
				startDevicePrice: '40001',
				endDevicePrice: '60000',
				packageType: 'Replace',
				offerType: 'Standard',
				orderType: 'Change Charge Type,Change Promotion,Change Service',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '242.06',
				priceIncVat: '259',
				irCountry: '',
				isRenew: 'false',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'endDt',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'discountFlag',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'price',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'IMEI',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Prepaid Start date',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'serviceItemIntegrationId',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1281494',
			title: 'AIS Care Plus เหมาจ่าย 12 เดือน 1,859 บาท',
			detailTH: 'AIS are Plus เหมาจ่าย 12 เดือน มูลค่า 1,859 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'AIS Care Plus 12 Months 1,859 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P220814340',
			promotionCode: 'null',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1688635029834',
			prototype: 'mobile_care',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'true',
				isPortIn: 'false',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB,CBS',
				networkType: '3G',
				promotionCode: 'P220814340',
				promotionName: 'Care Plus 1859Baht 12Months',
				shortNameEng: 'AIS Care Plus 12 Months 1,859 Baht',
				shortNameThai: 'AIS Care Plus เหมาจ่าย 12 เดือน 1,859 บาท',
				promotionFee: '1737.38',
				priceExclVat: '1737.38',
				productClass: 'On-Top Extra',
				productGroup: 'Mobile Care',
				productPkg: 'Mobile Care Bundle',
				descriptionThai: 'AIS are Plus เหมาจ่าย 12 เดือน มูลค่า 1,859 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'AIS Care Plus 12 Months 1,859 Baht (Included vat)',
				inStatementThai: 'AIS Care Plus เหมาจ่าย 12 เดือน มูลค่า 1,859 บาท',
				inStatementEng: 'AIS Care Plus 12 Months 1,859 Baht',
				numberOfMobile: '0',
				gprsType: 'N/A',
				effectiveStartDt: '2016-06-04',
				effectiveEndDt: '2024-01-31',
				statusCd: 'Active',
				duration: '12',
				durationType: 'Month_Midnight',
				priceInclVat: '1859',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Mobile Care Class',
				classAttributeDisplayName: 'Mobile Care Class',
				prorateFlg: 'N',
				startDevicePrice: '20001',
				endDevicePrice: '30000',
				packageType: 'Replace',
				offerType: 'Standard',
				orderType: 'Change Charge Type,Change Promotion,Change Service',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '1737.38',
				priceIncVat: '1859',
				irCountry: '',
				isRenew: 'false',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'endDt',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'discountFlag',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'price',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'IMEI',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Prepaid Start date',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'serviceItemIntegrationId',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
		{
			id: '1281496',
			title: 'AIS Care Plus เหมาจ่าย 12 เดือน 2,079 บาท',
			detailTH: 'AIS Care Plus เหมาจ่าย 12 เดือน มูลค่า 2,079 บาท (รวมภาษีมูลค่าเพิ่ม)',
			detailEN: 'AIS Care Plus 12 Months 2,079 Baht (Included vat)',
			thumbnail: 'null',
			feedItemId: 'P220814342',
			promotionCode: 'null',
			offeringCode: 'null',
			offeringId: 'null',
			packageId: 'null',
			featureCode: 'null',
			publish: 'true',
			priority: '0',
			lastUpdated: '1688635030534',
			prototype: 'mobile_care',
			customAttributes: {
				isNewRegistration: 'false',
				isChangeChargeType: 'true',
				isPortIn: 'false',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB,CBS',
				networkType: '3G',
				promotionCode: 'P220814342',
				promotionName: 'Care Plus 2079Baht 12Months',
				shortNameEng: 'AIS Care Plus 12 Months 2,079 Baht',
				shortNameThai: 'AIS Care Plus เหมาจ่าย 12 เดือน 2,079 บาท',
				promotionFee: '1942.99',
				priceExclVat: '1942.99',
				productClass: 'On-Top Extra',
				productGroup: 'Mobile Care',
				productPkg: 'Mobile Care Bundle',
				descriptionThai: 'AIS Care Plus เหมาจ่าย 12 เดือน มูลค่า 2,079 บาท (รวมภาษีมูลค่าเพิ่ม)',
				descriptionEng: 'AIS Care Plus 12 Months 2,079 Baht (Included vat)',
				inStatementThai: 'AIS Care Plus เหมาจ่าย 12 เดือน มูลค่า 2,079 บาท',
				inStatementEng: 'AIS Care Plus 12 Months 2,079 Baht',
				numberOfMobile: '0',
				gprsType: 'N/A',
				effectiveStartDt: '2016-01-01',
				effectiveEndDt: '2024-01-31',
				statusCd: 'Active',
				duration: '12',
				durationType: 'Month_Midnight',
				priceInclVat: '2079',
				priceType: 'One-Time',
				imeiFlg: 'N',
				chargeType: 'All',
				productType: 'Promotion',
				classAttributeName: 'Mobile Care Class',
				classAttributeDisplayName: 'Mobile Care Class',
				prorateFlg: 'N',
				startDevicePrice: '30001',
				endDevicePrice: '40000',
				packageType: 'Replace',
				offerType: 'Standard',
				orderType: 'Change Charge Type,Change Promotion,Change Service',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				priceExcVat: '1942.99',
				priceIncVat: '2079',
				irCountry: '',
				isRenew: 'false',
				parameters: [
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'endDt',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'discountFlag',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'price',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'IMEI',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'Prepaid Start date',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
					{
						Parameter: [
							{
								Name: 'attributeName',
								Value: 'serviceItemIntegrationId',
							},
							{
								Name: 'attributeValue',
							},
							{
								Name: 'requireFlag',
								Value: 'N',
							},
						],
					},
				],
			},
			accountFees: [],
			orderFees: [],
		},
	],
};

export const mockGetCarePromotionResponseEng = {
	statusCode: '2000',
	statusDesc: 'SUCCESS',
	data: [
		{
			productType: 'AIS Care Plus',
			service: 'Up to 4 years warranty',
			protection: [
				{
					name: 'hardware',
					isProtect: true,
				},
				{
					name: 'accident',
					isProtect: true,
				},
				{
					name: 'missing',
					isProtect: true,
				},
			],
			condition: [
				{
					detail: 'Exchange service 25%',
					price: '250',
				},
				{
					detail: 'Exchange service 42.5%',
					price: '425',
				},
			],
			serviceFee: 'charge according to the invoice',
			serviceType: {
				title: 'AIS Mobile Care',
				option: [
					{
						name: 'AIS Care Plus (Monthly',
						price: '139',
						promotionCode: 'P220814347',
					},
					{
						name: 'AIS Car',
						price: '1,529',
						promotionCode: 'P220814339',
					},
				],
			},
		},
	],
};
export const mockGetCarePromotionResponseTh = {
	handsetPrice: '20000',
	language: 'TH',
	productType: 'DEVICE',
	productSubType: 'HANDSET',
	productName: 'iPhone 12',
	brand: 'AIS',
	model: 'IP11P_128GB',
	matCode: '',
	activeDate: '',
};

export const mockGetCarePromotionResponseApple = {
	statusCode: '2000',
	statusDesc: 'SUCCESS',
	data: [
		{},
		{
			productType: 'AIS Care Plus',
			service: 'Up to 4 years warranty',
			protection: [
				{
					name: 'hardware',
					isProtect: true,
				},
				{
					name: 'accident',
					isProtect: true,
				},
				{
					name: 'missing',
					isProtect: true,
				},
			],
			condition: [
				{
					detail: 'Exchange service 25%',
					price: '5,000',
				},
				{
					detail: 'Exchange service 42.5%',
					price: '8,500',
				},
			],
			serviceFee: 'charge according to the invoice',
			serviceType: {
				title: 'AIS Mobile Care',
				option: [
					{
						name: 'AIS Care Plus (Monthly',
						price: '139',
						promotionCode: 'P220814347',
					},
					{
						name: 'AIS Car',
						price: '1,529',
						promotionCode: 'P220814339',
					},
				],
			},
		},
	],
};
