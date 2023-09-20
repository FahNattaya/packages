import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { IMinimumPackageRequest } from '../src/interfaces/package.interface';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import router from '../src/modules/product-package/product-package.route';
import { ProductPackageService } from '../src/modules/product-package/product-package.service';
import { PromotionService } from '../src/modules/promotion/promotion.service';

const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MTEwOTU1IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA5MzQwMDA2MjQiLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjg5MDQ0MTEyLCJleHAiOjk5OTk5OTk5OTl9.IYWZfvvlaBn9AhpvnWz42aLFZGdu7HbLUiSA-8VsKBI';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

const mockAllPackages = {
	statusCode: '2000',
	statusDesc: 'Success',
	data: [
		{
			id: 1099866,
			title: 'แพ็กเกจ Net Max Speed UNLIMITED 899 บาท',
			detailTH:
				'Net Max Speed UNLIMITED 899 บาท โทร 500 นาที เน็ตไม่จำกัด & AIS SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			detailEN:
				'Net Max Speed UNLIMITED 899B. Voice 500 mins, Unlimited internet & AIS SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
			thumbnail: null,
			feedItemId: 'P17037552',
			promotionCode: null,
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 2,
			lastUpdated: 1692640783502,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'true',
				isPortIn: 'true',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P17037552',
				promotionName: '4G_899B 3G12GB UL 4G UL 500Min SWifi',
				shortNameEng: 'Net Max Speed UNLIMITED package 899 Baht',
				shortNameThai: 'แพ็กเกจ Net Max Speed UNLIMITED 899 บาท',
				promotionFee: '899',
				priceExclVat: '899',
				productClass: 'Main',
				productGroup: 'VAS Promotion',
				productPkg: '3G2100 Main Package',
				descriptionThai:
					'Net Max Speed UNLIMITED 899 บาท โทร 500 นาที เน็ตไม่จำกัด & AIS SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				descriptionEng:
					'Net Max Speed UNLIMITED 899B. Voice 500 mins, Unlimited internet & AIS SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				inStatementThai:
					'Net Max Speed UNLIMITED 899 บาท โทร 500 นาที เน็ตไม่จำกัด & AIS SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				inStatementEng:
					'Net Max Speed UNLIMITED 899B. Voice 500 mins, Unlimited internet & AIS SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				numberOfMobile: '0',
				gprsType: 'Volume-Based',
				duration: '12',
				durationType: 'Bill Cycle',
				priceInclVat: '961.93',
				priceType: 'Recurring',
				imeiFlg: 'N',
				chargeType: 'Post-paid',
				productType: 'Promotion',
				isNewRegistration: 'true',
				isChangeChargeType: 'true',
				isRenew: 'false',
				prorateFlg: 'Y',
				effectiveStartDt: '2012-03-31',
				orderType: 'New Registration,Change Charge Type,Port - In,Change Promotion,Change Service,Change Owner',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				classAttributeName: '',
				classAttributeDisplayName: '',
				irCountry: '',
				effectiveEndDt: '2023-12-31',
				statusCd: 'Active',
				priceExcVat: '899',
				priceIncVat: '961.93',
				parameters: [],
			},
			accountFees: [],
			orderFees: [
				{
					billingSystem: null,
					productCode: 'P00000000',
					productName: 'DUMMY',
					priceExclVat: 0,
					priceInclVat: 0,
					productType: null,
					wordInStatementThai: null,
					wordInStatementEng: null,
				},
			],
		},
		{
			id: 1099867,
			title: 'แพ็กเกจ Net Max Speed UNLIMITED 1,099 บาท',
			detailTH:
				'Net Max Speed UNLIMITED 1099 บาท โทร 650 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			detailEN:
				'Net Max Speed UNLIMITED 1099B. Voice 650 mins, Unlimited internet & SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
			thumbnail: null,
			feedItemId: 'e75ce250-c9bd-4478-863e-92e4a2c74fff',
			promotionCode: 'P17037553',
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 4,
			lastUpdated: 1692640178721,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'true',
				mdmMassPoDetailRowId: '3d360b63-f516-438f-97eb-dcdaafad32cd',
				orderType:
					'Change Charge Type,Change Promotion,New Registration,Port - In,Renew / Recall from Terminate,Change Owner,Change Service,Re-New',
				promotionLevel: 'Mobile',
				chargeType: 'Post-paid',
				isChangePromotion: 'true',
				priceInclVat: '1175.93',
				durationType: 'Bill Cycle',
				isPortIn: 'true',
				referenceId: 'e75ce250-c9bd-4478-863e-92e4a2c74fff',
				prorateFlg: 'Y',
				effectiveEndDt: '2024-12-31',
				duration: '6',
				priceExclVat: '1099',
				promotionName: '4G_1099B 3G16GB UL 4G UL 650Min SWifi',
				shortNameThai: 'แพ็กเกจ Net Max Speed UNLIMITED 1,099 บาท',
				productSubGroup: 'Product Offering',
				imeiFlg: 'N',
				sharePlan: 'N',
				durationUnit: 'Bill Cycle',
				gprsType: 'Volume-Based',
				networkType: '3G',
				shortNameEng: 'Net Max Speed UNLIMITED package 1,099 Baht',
				prorate: 'Prorate IN & OUT',
				productType: 'Promotion',
				promotionFee: '1099',
				productPkg: '3G2100 Main Package',
				productClass: 'Main',
				resource: 'WiFi,Internet,SMS,Voice',
				priceType: 'Recurring',
				descriptionEng:
					'Net Max Speed UNLIMITED 1099B. Voice 650 mins, Unlimited internet & SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				rootNetworkType: 'AWN',
				statusCd: 'Active',
				effectiveStartDt: '2012-03-31',
				isNewRegistration: 'true',
				changePromotionFreeForFirstTimeFlag: 'Y',
				inStatementThai:
					'Net Max Speed UNLIMITED 1099 บาท โทร 650 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				downstreamSystem: 'SFF',
				isChangeService: 'true',
				changePromotionFeeFlag: 'Y',
				productGroup: 'VAS Promotion',
				billingSystem: 'IRB',
				descriptionThai:
					'Net Max Speed UNLIMITED 1099 บาท โทร 650 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				isRenew: 'true',
				numberOfMobile: '0',
				inStatementEng:
					'Net Max Speed UNLIMITED 1099B. Voice 650 mins, Unlimited internet & SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				isChangeChargeType: 'true',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				classAttributeName: '',
				classAttributeDisplayName: '',
				irCountry: '',
				priceExcVat: '1099',
				priceIncVat: '1175.93',
				feedItemId: 'e75ce250-c9bd-4478-863e-92e4a2c74fff',
				changePromotionFreeDaysForFreeFirstTime: null,
				promotionCode: 'P17037553',
				productCd: 'P17037553',
				productCode: 'P17037553',
				parameters: [],
			},
			accountFees: [],
			orderFees: [
				{
					billingSystem: null,
					productCode: 'P00000000',
					productName: 'DUMMY',
					priceExclVat: 0,
					priceInclVat: 0,
					productType: null,
					wordInStatementThai: null,
					wordInStatementEng: null,
				},
			],
		},
		{
			id: 1099868,
			title: 'แพ็กเกจ Net Max Speed UNLIMITED 1,299 บาท',
			detailTH:
				'Net Max Speed UNLIMITED 1299 บาท โทร 850นาที เน็ต4Gใช้ไม่อั้นความเร็วสูงสุดไม่เกิน300Mbps และ3Gที่ความเร็วสูงสุดจำนวน 20GB จากนั้นใช้ได้ต่อเนื่องความเร็วสูงสุดไม่เกิน384Kbps & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			detailEN:
				'Net Max Speed UNLIMITED 1299B. Voice 850 mins, Unlimited 4G internet at max speed 300Mbps and 3G at max speed total of 20GB afterward non-stop net speed at 384Kbps & SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
			thumbnail: null,
			feedItemId: 'P17037554',
			promotionCode: null,
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 3,
			lastUpdated: 1692640784465,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'true',
				isRenew: 'false',
				productGroup: 'VAS Promotion',
				networkType: '3G',
				productPkg: '3G2100 Main Package',
				promotionCode: 'P17037554',
				priceExclVat: '1299',
				productClass: 'Main',
				numberOfMobile: '0',
				productType: 'Promotion',
				shortNameEng: 'Net Max Speed UNLIMITED package 1,299 Baht',
				promotionName: '4G_1299B 3G20GB UL 4G UL 850Min SWifi',
				inStatementEng:
					'Net Max Speed UNLIMITED 1299B. Voice 850 mins, Unlimited internet & AIS SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				durationType: 'Bill Cycle',
				isPortIn: 'true',
				shortNameThai: 'แพ็กเกจ Net Max Speed UNLIMITED 1,299 บาท',
				isChangeChargeType: 'true',
				priceInclVat: '1389.93',
				promotionFee: '1299',
				isNewRegistration: 'true',
				inStatementThai:
					'Net Max Speed UNLIMITED 1299 บาท โทร 850นาที เน็ตไม่จำกัด & AIS SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				isChangeService: 'true',
				effectiveEndDt: '2023-12-31',
				priceType: 'Recurring',
				descriptionThai:
					'Net Max Speed UNLIMITED 1299 บาท โทร 850นาที เน็ต4Gใช้ไม่อั้นความเร็วสูงสุดไม่เกิน300Mbps และ3Gที่ความเร็วสูงสุดจำนวน 20GB จากนั้นใช้ได้ต่อเนื่องความเร็วสูงสุดไม่เกิน384Kbps & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				billingSystem: 'IRB',
				duration: '12',
				statusCd: 'Active',
				chargeType: 'Post-paid',
				isChangePromotion: 'true',
				imeiFlg: 'N',
				descriptionEng:
					'Net Max Speed UNLIMITED 1299B. Voice 850 mins, Unlimited 4G internet at max speed 300Mbps and 3G at max speed total of 20GB afterward non-stop net speed at 384Kbps & SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				gprsType: 'Volume-Based',
				prorateFlg: 'Y',
				orderType: 'New Registration,Change Charge Type,Port - In,Change Promotion,Change Service,Change Owner',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				classAttributeName: '',
				classAttributeDisplayName: '',
				irCountry: '',
				priceExcVat: '1299',
				priceIncVat: '1389.93',
				effectiveStartDt: '2012-03-31',
				parameters: [],
			},
			accountFees: [],
			orderFees: [
				{
					billingSystem: null,
					productCode: 'P00000000',
					productName: 'DUMMY',
					priceExclVat: 0,
					priceInclVat: 0,
					productType: null,
					wordInStatementThai: null,
					wordInStatementEng: null,
				},
			],
		},
		{
			id: 1099886,
			title: 'แพ็กเกจ Net Max Speed UNLIMITED 699 บาท',
			detailTH:
				'Net Max Speed UNLIMITED 699 บาท โทร 300 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			detailEN:
				'Net Max Speed UNLIMITED 699B. Voice 300 mins, Unlimited internet& SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
			thumbnail: null,
			feedItemId: 'P17068673',
			promotionCode: null,
			offeringCode: null,
			offeringId: null,
			packageId: null,
			featureCode: null,
			publish: true,
			priority: 1,
			lastUpdated: 1692640801235,
			prototype: 'promotion',
			customAttributes: {
				isChangeOwner: 'true',
				isPortIn: 'true',
				isChangePromotion: 'true',
				isChangeService: 'true',
				billingSystem: 'IRB',
				networkType: '3G',
				promotionCode: 'P17068673',
				promotionName: '4G_699B 3G8GB UL 4G UL 300Min SWifi',
				shortNameEng: 'Net Max Speed UNLIMITED package 699 Baht',
				shortNameThai: 'แพ็กเกจ Net Max Speed UNLIMITED 699 บาท',
				promotionFee: '699',
				priceExclVat: '699',
				productClass: 'Main',
				productGroup: 'VAS Promotion',
				productPkg: '3G2100 Main Package',
				descriptionThai:
					'Net Max Speed UNLIMITED 699 บาท โทร 300 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				descriptionEng:
					'Net Max Speed UNLIMITED 699B. Voice 300 mins, Unlimited internet& SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				inStatementThai:
					'Net Max Speed UNLIMITED 699 บาท โทร 300 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
				inStatementEng:
					'Net Max Speed UNLIMITED 699B. Voice 300 mins, Unlimited internet & SUPER WiFi. Exceeds: Voice/VDO call 1.50B./min, SMS 2.5 B., MMS 4 B., 12 bill cycles.',
				numberOfMobile: '0',
				gprsType: 'Volume-Based',
				duration: '12',
				durationType: 'Bill Cycle',
				priceInclVat: '747.93',
				priceType: 'Recurring',
				chargeType: 'Post-paid',
				productType: 'Promotion',
				isNewRegistration: 'true',
				isChangeChargeType: 'true',
				isRenew: 'false',
				prorateFlg: 'Y',
				effectiveEndDt: '2025-12-01',
				effectiveStartDt: '2017-06-01',
				imeiFlg: 'N',
				orderType: 'New Registration,Change Charge Type,Port - In,Change Promotion,Change Service,Change Owner',
				bvPoint: '',
				bvDescription: '',
				externalMsg: '',
				bosProdId: '',
				classAttributeName: '',
				classAttributeDisplayName: '',
				irCountry: '',
				statusCd: 'Active',
				priceExcVat: '699',
				priceIncVat: '747.93',
				parameters: [],
			},
			accountFees: [],
			orderFees: [
				{
					billingSystem: null,
					productCode: 'P00000000',
					productName: 'DUMMY',
					priceExclVat: 0,
					priceInclVat: 0,
					productType: null,
					wordInStatementThai: null,
					wordInStatementEng: null,
				},
			],
		},
	],
};

describe('filterPackages', () => {
	it('should map data correctly for EN language', async () => {
		const data: any = {
			resultData: {
				mobilePackageCurrent: {
					main: {
						shortenedNameEN: 'Package A',
						priceIncludeVat: '100',
						descriptionEN: 'Package A description',
						cbsProductExpireTime: '2023-08-31',
					},
				},
			},
		};

		const language = 'EN';
		const mappedData: any = await ProductPackageService.mapDataCurrentPack(data, language);

		expect(mappedData.name).toBe(data.resultData.mobilePackageCurrent.main.shortenedNameEN);
		expect(mappedData.price).toBe(data.resultData.mobilePackageCurrent.main.priceIncludeVat);
		expect(mappedData.description).toBe(data.resultData.mobilePackageCurrent.main.descriptionEN);
		expect(mappedData.endDate).toBe(data.resultData.mobilePackageCurrent.main.cbsProductExpireTime);
	});
});

describe('getContractFirstPack', () => {
	const mockContractFirstPackResponse = {
		resultCode: '20000',
		developerMessage: 'Success',
		data: {
			firstPackage: 0,
			minPrice: 0,
			initialPackage: 0,
			inPackage: [],
		},
	};

	const mockRequest = {
		ExecuteService: {
			sffRequest: {
				Event: 'evOMQueryContract',
				ParameterList: {
					Parameter: [
						{
							Name: 'option',
							Value: '3',
						},
						{
							Name: 'mobileNo',
							Value: '0934000624',
						},
						{
							Name: 'idCardNo',
							Value: '8723878111001',
						},
						{
							Name: 'profileType',
							Value: 'All',
						},
					],
				},
			},
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should return response when call getContractFirstPack success', async () => {
		axios.post = jest.fn().mockResolvedValueOnce(mockContractFirstPackResponse);
		const result = await ProductPackageService.contractFirstPack(mockRequest);
		expect(result).toEqual(mockContractFirstPackResponse.data);
	});
});

describe('getPackagesByCondition', () => {
	beforeEach(() => {
		PromotionService.getAllPromotionsByShelf = jest.fn().mockResolvedValue(mockAllPackages);
		axios.post = jest.fn();
	});
	afterEach(() => {
		PromotionService.getAllPromotionsByShelf = jest.fn().mockClear();
		jest.restoreAllMocks();
	});
	const mockMinimumPackageRequest: IMinimumPackageRequest = {
		sanitizedName: 'main-promotion-4g-max-speed-unlimited',
		minimumPackagePrice: 399,
		billingSystem: 'All',
		location: '1100',
		orderType: 'Change Promotion',
		productClass: 'Main',
		contractPack: {
			firstPackage: '0',
			minPrice: 0,
			initialPackage: '',
			inPackage: [],
		},
	};

	const mockMimumPackages = {
		statusCode: '2000',
		statusDesc: 'Success',
		data: [
			{
				orderNo: '1',
				priority: 1,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 699 บาท',
				promotionCode: 'P17068673',
				offeringCode: '',
				detailTH:
					'Net Max Speed UNLIMITED 699 บาท โทร 300 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
			{
				orderNo: '2',
				priority: 2,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 899 บาท',
				promotionCode: 'P17037552',
				offeringCode: '',
				detailTH:
					'Net Max Speed UNLIMITED 899 บาท โทร 500 นาที เน็ตไม่จำกัด & AIS SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
			{
				orderNo: '3',
				priority: 3,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 1,299 บาท',
				promotionCode: 'P17037554',
				offeringCode: '',
				detailTH:
					'Net Max Speed UNLIMITED 1299 บาท โทร 850นาที เน็ต4Gใช้ไม่อั้นความเร็วสูงสุดไม่เกิน300Mbps และ3Gที่ความเร็วสูงสุดจำนวน 20GB จากนั้นใช้ได้ต่อเนื่องความเร็วสูงสุดไม่เกิน384Kbps & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
			{
				orderNo: '4',
				priority: 4,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 1,099 บาท',
				promotionCode: 'P17037553',
				offeringCode: '',
				detailTH:
					'Net Max Speed UNLIMITED 1099 บาท โทร 650 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
		],
	};
	it('should return filtered by contract first pack minimum price', async () => {
		mockMinimumPackageRequest.minimumPackagePrice = 100;
		mockMinimumPackageRequest.contractPack.minPrice = 120;
		const result = await ProductPackageService.getPackagesByConditionData(mockMinimumPackageRequest);
		expect(result.data).toEqual(expect.arrayContaining(mockMimumPackages.data));
	});

	it('should return filtered by trade promotion minimum price', async () => {
		mockMinimumPackageRequest.minimumPackagePrice = 170;
		mockMinimumPackageRequest.contractPack.minPrice = 90;
		const result = await ProductPackageService.getPackagesByConditionData(mockMinimumPackageRequest);
		expect(result.data).toEqual(expect.arrayContaining(mockMimumPackages.data));
	});

	it('should return filtered by minimum price when contract first pack minimum price equals to trade promotion minimum price', async () => {
		mockMinimumPackageRequest.minimumPackagePrice = 150;
		mockMinimumPackageRequest.contractPack.minPrice = 150;
		const result = await ProductPackageService.getPackagesByConditionData(mockMinimumPackageRequest);
		expect(result.data).toEqual(expect.arrayContaining(mockMimumPackages.data));
	});

	it('should return filtered by in-packages name if exist', async () => {
		mockMinimumPackageRequest.minimumPackagePrice = 50;
		mockMinimumPackageRequest.contractPack.minPrice = 50;
		mockMinimumPackageRequest.contractPack.inPackage = ['Data One-time Package'];
		const result = await ProductPackageService.getPackagesByConditionData(mockMinimumPackageRequest);
		expect(result.data).toEqual(expect.arrayContaining([]));
	});
});

describe('queryContractFirstPack', () => {
	const mockRequest = {
		ExecuteService: {
			sffRequest: {
				Event: 'evOMQueryContract',
				ParameterList: {
					Parameter: [
						{
							Name: 'option',
							Value: '3',
						},
						{
							Name: 'mobileNo',
							Value: '0934000623',
						},
						{
							Name: 'idCardNo',
							Value: '8254038811721',
						},
						{
							Name: 'profileType',
							Value: 'All',
						},
					],
				},
			},
		},
	};

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should call api contract first pack when use function queryContractFirstPack', async () => {
		const expectedResult = {
			resultCode: '20000',
			developerMessage: 'Success',
			data: {
				firstPackage: 0,
				minPrice: 0,
				initialPackage: 0,
				inPackage: [],
			},
		};

		const mockContractFirstPack = {
			resultCode: '20000',
			developerMessage: 'Success',
			data: {
				ExecuteServiceResponse: {
					return: {
						ParameterList: {
							Parameter: [
								{
									Name: 'errorMessage',
								},
							],
							ParameterList: [
								{
									Parameter: [
										{
											Name: 'profileType',
											Value: 'Device',
										},
									],
									ParameterList: [
										{
											Parameter: [
												{
													Name: 'idCard',
													Value: '8254038811721',
												},
												{
													Name: 'countContract',
													Value: '1',
												},
												{
													Name: 'countContractExc',
													Value: '1',
												},
												{
													Name: 'countContractProfileId',
													Value: '1',
												},
												{
													Name: 'countContractProfileIdExc',
													Value: '1',
												},
												{
													Name: 'countContractMobile',
													Value: '1',
												},
												{
													Name: 'countContractMobileExc',
													Value: '1',
												},
											],
											ParameterList: [
												{
													Parameter: [
														{
															Name: 'mobileNo',
															Value: '0934000623',
														},
														{
															Name: 'mobileStatus',
															Value: 'Active',
														},
														{
															Name: 'projectName',
															Value: 'AIS Best Buy 12M (Test Installment and Compensation)',
														},
														{
															Name: 'contractName',
															Value: 'Specific_E2E',
														},
														{
															Name: 'brand',
															Value: 'APPLE',
														},
														{
															Name: 'model',
															Value: 'IPHONEXSM256',
														},
														{
															Name: 'color',
															Value: 'SPACE GREY',
														},
														{
															Name: 'imei',
															Value: '110026012023059',
														},
														{
															Name: 'receiptNo',
															Value: '1100230600000064',
														},
														{
															Name: 'receiptDt',
															Value: '29/06/2023 00:00:00',
														},
														{
															Name: 'status',
															Value: 'Active',
														},
														{
															Name: 'startDt',
															Value: '29/06/2023 00:00:00',
														},
														{
															Name: 'endDt',
															Value: '28/06/2024 00:00:00',
														},
														{
															Name: 'duration',
															Value: '365',
														},
														{
															Name: 'remain',
															Value: '344',
														},
														{
															Name: 'penalty',
															Value: '2803.74',
														},
														{
															Name: 'ussdCode',
															Value: '*999*035*6#',
														},
														{
															Name: 'contractNo',
															Value: 'CTM20230629102540487588',
														},
														{
															Name: 'tdmContractId',
															Value: '72',
														},
														{
															Name: 'lastUpdate',
															Value: '29/06/2023 10:25:45',
														},
														{
															Name: 'created',
															Value: '29/06/2023 10:25:41',
														},
													],
													ParameterList: [
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'lock_order',
																},
																{
																	Name: 'contractRuleValue',
																	Value: 'Port - Out',
																},
															],
														},
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'lock_order',
																},
																{
																	Name: 'contractRuleValue',
																	Value: 'Change Owner',
																},
															],
														},
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'lock_order',
																},
																{
																	Name: 'contractRuleValue',
																	Value: 'Change Charge Type',
																},
															],
														},
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'lock_order',
																},
																{
																	Name: 'contractRuleValue',
																	Value: 'Disconnect - Customer Request',
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					},
				},
			},
		};
		ProductPackageService.contractFirstPack = jest.fn().mockResolvedValue(mockContractFirstPack);
		const result = await ProductPackageService.queryContractFirstPack(mockRequest);

		expect(result).toEqual(expectedResult);
	});

	it('should return the expected result for valid data', async () => {
		const mockResponse = {
			resultCode: '20000',
			developerMessage: 'Success',
			data: {
				ExecuteServiceResponse: {
					return: {
						ParameterList: {
							Parameter: [
								{
									Name: 'errorMessage',
								},
							],
							ParameterList: [
								{
									Parameter: [
										{
											Name: 'profileType',
											Value: 'Device',
										},
									],
									ParameterList: [
										{
											Parameter: [
												{
													Name: 'idCard',
													Value: '8254038811721',
												},
												{
													Name: 'countContract',
													Value: '1',
												},
												{
													Name: 'countContractExc',
													Value: '1',
												},
												{
													Name: 'countContractProfileId',
													Value: '1',
												},
												{
													Name: 'countContractProfileIdExc',
													Value: '1',
												},
												{
													Name: 'countContractMobile',
													Value: '1',
												},
												{
													Name: 'countContractMobileExc',
													Value: '1',
												},
											],
											ParameterList: [
												{
													Parameter: [
														{
															Name: 'mobileNo',
															Value: '0934000623',
														},
														{
															Name: 'mobileStatus',
															Value: 'Active',
														},
														{
															Name: 'projectName',
															Value: 'AIS Best Buy 12M (Test Installment and Compensation)',
														},
														{
															Name: 'contractName',
															Value: 'Specific_E2E',
														},
														{
															Name: 'brand',
															Value: 'APPLE',
														},
														{
															Name: 'model',
															Value: 'IPHONEXSM256',
														},
														{
															Name: 'color',
															Value: 'SPACE GREY',
														},
														{
															Name: 'imei',
															Value: '110026012023059',
														},
														{
															Name: 'receiptNo',
															Value: '1100230600000064',
														},
														{
															Name: 'receiptDt',
															Value: '29/06/2023 00:00:00',
														},
														{
															Name: 'status',
															Value: 'Active',
														},
														{
															Name: 'startDt',
															Value: '29/06/2023 00:00:00',
														},
														{
															Name: 'endDt',
															Value: '28/06/2024 00:00:00',
														},
														{
															Name: 'duration',
															Value: '365',
														},
														{
															Name: 'remain',
															Value: '344',
														},
														{
															Name: 'penalty',
															Value: '2803.74',
														},
														{
															Name: 'ussdCode',
															Value: '*999*035*6#',
														},
														{
															Name: 'contractNo',
															Value: 'CTM20230629102540487588',
														},
														{
															Name: 'tdmContractId',
															Value: '72',
														},
														{
															Name: 'lastUpdate',
															Value: '29/06/2023 10:25:45',
														},
														{
															Name: 'created',
															Value: '29/06/2023 10:25:41',
														},
													],
													ParameterList: [
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'lock_order',
																},
																{
																	Name: 'contractRuleValue',
																	Value: 'Port - Out',
																},
															],
														},
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'in_package',
																},
																{
																	Name: 'contractRuleValue',
																	Value: 'Package A',
																},
															],
														},
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'First Package',
																},
																{
																	Name: 'contractRuleValue',
																	Value: '0',
																},
															],
														},
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'Min Price',
																},
																{
																	Name: 'contractRuleValue',
																	Value: '699',
																},
															],
														},
														{
															Parameter: [
																{
																	Name: 'contractRuleName',
																	Value: 'Initial Package',
																},
																{
																	Name: 'contractRuleValue',
																	Value: '0',
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					},
				},
			},
		};
		const expectedResult = {
			resultCode: '20000',
			developerMessage: 'Success',
			data: {
				firstPackage: 0,
				minPrice: 699,
				initialPackage: 0,
				inPackage: ['Package A'],
			},
		};
		ProductPackageService.contractFirstPack = jest.fn().mockResolvedValue(mockResponse);
		const result = await ProductPackageService.queryContractFirstPack(mockRequest);

		expect(result).toEqual(expectedResult);
	});
});

describe('PromotionCurrentPack', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});
	const bodyTH = {
		mobileNo: '66934009882',
		language: 'TH',
	};

	it('should call api contract first pack when use function queryPromotionCurrentPack is True', async () => {
		jest.spyOn(ProductPackageService, 'queryPromotionCurrentPack').mockResolvedValue({});
		const result = await ProductPackageService.queryPromotionCurrentPack(bodyTH);
		expect(result).toEqual({});
	});
});

describe('POST product-package /contract-first-pack', () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	const bodyContract = {
		ExecuteService: {
			sffRequest: {
				Event: 'evOMQueryContract',
				ParameterList: {
					Parameter: [
						{
							Name: 'option',
							Value: '3',
						},
						{
							Name: 'mobileNo',
							Value: '0934000623',
						},
						{
							Name: 'idCardNo',
							Value: '8254038811721',
						},
						{
							Name: 'profileType',
							Value: 'All',
						},
					],
				},
			},
		},
	};

	it('should return contract first pack with status 200 when call route', async () => {
		const mockRespone = {
			resultCode: '20000',
			developerMessage: 'Success',
			data: {
				ExecuteServiceResponse: {
					return: {
						ParameterList: {
							Parameter: [
								{
									Name: 'errorMessage',
								},
							],

							ParameterList: [
								{
									Parameter: [
										{
											Name: 'profileType',

											Value: 'Device',
										},
									],

									ParameterList: [
										{
											Parameter: [
												{
													Name: 'idCard',

													Value: '8723878111001',
												},

												{
													Name: 'countContract',

													Value: '1',
												},

												{
													Name: 'countContractExc',

													Value: '1',
												},

												{
													Name: 'countContractProfileId',

													Value: '1',
												},

												{
													Name: 'countContractProfileIdExc',

													Value: '1',
												},

												{
													Name: 'countContractMobile',

													Value: '1',
												},

												{
													Name: 'countContractMobileExc',

													Value: '1',
												},
											],

											ParameterList: [
												{
													Parameter: [
														{
															Name: 'mobileNo',

															Value: '0934000624',
														},

														{
															Name: 'mobileStatus',

															Value: 'Active',
														},

														{
															Name: 'projectName',

															Value: 'AIS Best Buy 12M (Test Installment and Compensation)',
														},

														{
															Name: 'contractName',

															Value: 'Specific_E2E',
														},

														{
															Name: 'brand',

															Value: 'APPLE',
														},

														{
															Name: 'model',

															Value: 'IPHONEXSM256',
														},

														{
															Name: 'color',

															Value: 'SPACE GREY',
														},

														{
															Name: 'imei',

															Value: '110026012023060',
														},

														{
															Name: 'receiptNo',

															Value: '1100230600000063',
														},

														{
															Name: 'receiptDt',

															Value: '28/06/2023 00:00:00',
														},

														{
															Name: 'status',

															Value: 'Active',
														},

														{
															Name: 'startDt',

															Value: '28/06/2023 00:00:00',
														},

														{
															Name: 'endDt',

															Value: '27/06/2024 00:00:00',
														},

														{
															Name: 'duration',

															Value: '365',
														},

														{
															Name: 'remain',

															Value: '344',
														},

														{
															Name: 'penalty',

															Value: '2803.74',
														},

														{
															Name: 'ussdCode',

															Value: '*999*035*6#',
														},

														{
															Name: 'contractNo',

															Value: 'CTM20230628164042003955',
														},

														{
															Name: 'tdmContractId',

															Value: '72',
														},

														{
															Name: 'lastUpdate',

															Value: '28/06/2023 16:40:46',
														},

														{
															Name: 'created',

															Value: '28/06/2023 16:40:42',
														},
													],

													ParameterList: [
														{
															Parameter: [
																{
																	Name: 'contractRuleName',

																	Value: 'lock_order',
																},

																{
																	Name: 'contractRuleValue',

																	Value: 'Port - Out',
																},
															],
														},

														{
															Parameter: [
																{
																	Name: 'contractRuleName',

																	Value: 'lock_order',
																},

																{
																	Name: 'contractRuleValue',

																	Value: 'Change Owner',
																},
															],
														},

														{
															Parameter: [
																{
																	Name: 'contractRuleName',

																	Value: 'lock_order',
																},

																{
																	Name: 'contractRuleValue',

																	Value: 'Change Charge Type',
																},
															],
														},

														{
															Parameter: [
																{
																	Name: 'contractRuleName',

																	Value: 'lock_order',
																},

																{
																	Name: 'contractRuleValue',

																	Value: 'Disconnect - Customer Request',
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					},
				},
			},
		};

		ProductPackageService.contractFirstPack = jest.fn().mockResolvedValue(mockRespone);
		const res = await request(app).post(`/contract-first-pack`).send(bodyContract).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockRespone);
	});

	it('should handle when error accured', async () => {
		ProductPackageService.contractFirstPack = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(`/contract-first-pack`).send(bodyContract).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: "Error", success: false });
	});
});

describe('POST product-package /query-contract-first-pack', () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	const bodyContract = {
		ExecuteService: {
			sffRequest: {
				Event: 'evOMQueryContract',
				ParameterList: {
					Parameter: [
						{
							Name: 'option',
							Value: '3',
						},
						{
							Name: 'mobileNo',
							Value: '0934000623',
						},
						{
							Name: 'idCardNo',
							Value: '8254038811721',
						},
						{
							Name: 'profileType',
							Value: 'All',
						},
					],
				},
			},
		},
	};

	it('should return query contract first pack with status 200 when call route', async () => {
		const mockQueryContract = {
			resultCode: '20000',
			developerMessage: 'Success',
			data: {
				firstPackage: 0,
				minPrice: 0,
				initialPackage: 0,
				inPackage: [],
			},
		};
		ProductPackageService.contractFirstPack = jest.fn();
		ProductPackageService.queryContractFirstPack = jest.fn().mockResolvedValue(mockQueryContract);
		const res = await request(app)
			.post(`/query-contract-first-pack`)
			.send(bodyContract)
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockQueryContract);
	});

	it('should handle when error accured', async () => {
		ProductPackageService.contractFirstPack = jest.fn();
		ProductPackageService.queryContractFirstPack = jest
			.fn()
			.mockRejectedValueOnce(new Error('can not query contarct first pack'));
		const res = await request(app).post(`/contract-first-pack`).send(bodyContract).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductPackageService.contractFirstPack = jest.fn();
		ProductPackageService.queryContractFirstPack = jest
			.fn()
			.mockRejectedValueOnce(new Error('can not query contarct first pack'));
		const res = await request(app).post(`/contract-first-pack`).send(bodyContract);
		expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
		expect(res.body).toEqual({ message: 'Authentication token missing', success: false });
	});
});

describe('POST product-package /query-promotion-current-pack', () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	const body = {
		mobileNo: '66934009882',
		language: 'TH',
	};

	it('should return current pack with status 200 when call route', async () => {
		const mockCurrentPack = {
			statusCode: '2000',
			statusDesc: 'Success',
			data: {
				name: 'แพ็กเกจ 5G Netflix 499บาท',
				price: '533.9300000000001',
				description:
					'5G Netflix monthly fee 499B. Netflix Mobile and internet 30GB then continue at speed 1Mbps. Unlimited AIS SUPER WiFi. Call all networks 200 mins. Exceed Voice/VDO call 1.50B/min,SMS 2.50B, MMS 4B, 12 bill cycles.',
				endDate: '08/08/2024 00:00:00',
			},
		};

		ProductPackageService.queryContractFirstPack = jest.fn();
		ProductPackageService.mapQueryPromotionCurrentPack = jest.fn().mockResolvedValue(mockCurrentPack);
		const res = await request(app).post(`/query-promotion-current-pack`).send(body).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockCurrentPack);
	});

	it('should handle when error accured', async () => {
		ProductPackageService.queryContractFirstPack = jest.fn();
		ProductPackageService.mapQueryPromotionCurrentPack = jest.fn();
		const res = await request(app).post(`/query-promotion-current-pack`).send(body).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductPackageService.contractFirstPack = jest.fn();
		ProductPackageService.queryContractFirstPack = jest
			.fn()
			.mockRejectedValueOnce(new Error('can not query contarct first pack'));
		const res = await request(app).post(`/query-promotion-current-pack`).send(body);
		expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
		expect(res.body).toEqual({ message: 'Authentication token missing', success: false });
	});
});

describe('POST product-package /queryPromotionCurrentPack', () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	const body = {
		mobileNo: '66934009882',
		language: 'TH',
	};

	it('should return current pack with status 200 when call route', async () => {
		const mockCurrentPack = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Request successful',
			resultData: {
				mobilePackageCurrent: {
					main: {
						cbsProductId: '',
						cbsProductSequenceId: '',
						cbsProductName: '',
						cbsNotificationNameEng: '',
						cbsNotificationNameThai: '',
						cbsNotificationNameAseanLang: '',
						cbsProductEffectiveTime: '',
						cbsProductExpireTime: '',
						cbsProductActivationTime: '',
						cbsNextBillDate: '',
						cbsProductStatus: '',
						name: '5G_Max Speed 499B NF 200min 30GB_SWifi',
						shortenedNameTH: 'แพ็กเกจ 5G Netflix 499บาท',
						shortenedNameEN: '5G Netflix Package 499Baht',
						descriptionTH:
							'แพ็ก 5G Netflix ค่าบริการ 499บ./เดือน สิทธิ์ใช้งาน Netflix Mobile พร้อมอินเทอร์เน็ต 30GB จากนั้นใช้ต่อเนื่องที่ความเร็ว 1Mbps, AIS SUPER WiFi ไม่จำกัด โทรทุกเครือข่าย 200นาที ส่วนเกินโทร/VDO call นาทีละ 1.50บ., SMS 2.50บ., MMS 4บ., 12รอบบิล',
						descriptionEN:
							'5G Netflix monthly fee 499B. Netflix Mobile and internet 30GB then continue at speed 1Mbps. Unlimited AIS SUPER WiFi. Call all networks 200 mins. Exceed Voice/VDO call 1.50B/min,SMS 2.50B, MMS 4B, 12 bill cycles.',
						billItemDescriptionTH:
							'แพ็ก 5G Netflix ค่าบริการ 499บ./เดือน สิทธิ์ใช้งาน Netflix Mobile พร้อมอินเทอร์เน็ต 30GB จากนั้นใช้ต่อเนื่องที่ความเร็ว 1Mbps, AIS SUPER WiFi ไม่จำกัด โทรทุกเครือข่าย 200นาที ส่วนเกินโทร/VDO call นาทีละ 1.50บ., SMS 2.50บ., MMS 4บ., 12รอบบิล',
						billItemDescriptionEN:
							'5G Netflix monthly fee 499B. Netflix Mobile and internet 30GB then continue at speed 1Mbps. Unlimited AIS SUPER WiFi. Call all networks 200 mins. Exceed Voice/VDO call 1.50B/min,SMS 2.50B, MMS 4B, 12 bill cycles.',
						productCd: 'P230317661',
						productClass: 'Main',
						attribute: [],
						maxFnNo: '',
						productOfferPriceId: 'O2303P230317661',
						packageId: '',
						monthlyFee: '',
						othersFeeRate: '',
						productType: '',
						groupPromo: '',
						productEffectiveTime: '10/07/2023 21:03:32',
						productExpireTime: '08/08/2024 00:00:00',
						nextBillDate: '',
						IntegrationNameTH: '5G_Max Speed 499B NF 200min 30GB_SWifi',
						IntegrationNameEN: '5G_Max Speed 499B NF 200min 30GB_SWifi',
						priceType: 'Recurring',
						offeringName: '',
						priceIncludeVat: '533.9300000000001',
						productStatus: 'Active',
						productId: '17000101',
						productSequenceId: '1339213',
						productName: '5G_Max Speed 499B NF 200min 30GB_SWifi',
						extProductId: '',
						extProductSequenceId: '',
						extProductName: '',
						extNotificationNameEng: '',
						extNotificationNameThai: '',
						extNotificationNameAseanLang: '',
						extProductEffectiveTime: '',
						extProductExpireTime: '',
						extProductActivationTime: '',
						extNextBillDate: '',
						extProductStatus: '',
						bundlingServiceName: '',
						commercialType: '',
						freeUnitItemList: [],
						productPackage: '5G SA Main Package',
						offeringGroup: 'VAS Promotion',
						prorateFlag: 'Y',
						createUser: 'EAI_USR',
						createDate: '10/07/2023 21:04:12',
						duration: '12',
						durationType: 'Bill Cycle',
						chargeAmount: '',
						openDate: '',
						gvProductSequenceId: '6#7#8',
						upLoadSpeed: '',
						downLoadSpeed: '',
						nextPackage: [],
						priceExcludeVat: '499',
						pro5gflg: 'Y',
						productAcctnCat: 'R',
						deviceContractFlg: 'N',
						netFlexiFlg: '',
						crmFlag: '',
						paymentMode: 'Post-paid',
					},
					ontop: [
						{
							cbsProductId: '',
							cbsProductSequenceId: '',
							cbsProductName: '',
							cbsNotificationNameEng: '',
							cbsNotificationNameThai: '',
							cbsNotificationNameAseanLang: '',
							cbsProductEffectiveTime: '',
							cbsProductExpireTime: '',
							cbsProductActivationTime: '',
							cbsNextBillDate: '',
							cbsProductStatus: '',
							name: 'M_Netflix Mobile Free 12Bill',
							shortenedNameTH: 'แพ็กเกจรายเดือน Netflix Mobile Plan',
							shortenedNameEN: 'Netflix monthly package mobile plan',
							descriptionTH: 'แพ็กเกจรายเดือน Netflix Mobile Plan',
							descriptionEN: 'Netflix monthly package mobile plan',
							billItemDescriptionTH: 'แพ็กเกจรายเดือน Netflix Mobile Plan',
							billItemDescriptionEN: 'Netflix monthly package mobile plan',
							featureCode: 'P230317703',
							productCd: 'P230317703',
							productClass: 'On-Top',
							attribute: [],
							maxFnNo: '',
							productOfferPriceId: 'O2303P230317703',
							featureStatus: '',
							featureStatusDate: '',
							featureSubCode: '',
							earlyRenewOfferingFlag: '',
							firstUseFlag: '',
							freeUnitItemList: [],
							groupFeature: '',
							featureName: '',
							moreInfoFlag: '',
							productEffectiveTime: '10/07/2023 21:03:32',
							productExpireTime: '08/08/2024 00:00:00',
							nextBillDate: '',
							priceType: 'Recurring',
							offeringName: '',
							priceIncludeVat: '0',
							productStatus: 'Active',
							freeFeatureName: '',
							IntegrationNameTH: 'M_Netflix Mobile Free 12Bill',
							IntegrationNameEN: 'M_Netflix Mobile Free 12Bill',
							productId: '800001',
							productSequenceId: '1339215',
							productName: 'M_Netflix Mobile Free 12Bill',
							ivrCancelFlag: '',
							ivrQueryFlag: '',
							extProductId: '',
							extProductSequenceId: '',
							extProductName: '',
							extNotificationNameEng: '',
							extNotificationNameThai: '',
							extNotificationNameAseanLang: '',
							extProductEffectiveTime: '',
							extProductExpireTime: '',
							extProductActivationTime: '',
							extNextBillDate: '',
							extProductStatus: '',
							commercialType: '',
							holdFlag: '',
							productPackage: 'Netflix Bundle Package',
							offeringGroup: 'VAS Promotion',
							prorateFlag: '',
							createUser: 'EAI_USR',
							createDate: '10/07/2023 21:04:12',
							duration: '12',
							durationType: 'Bill Cycle',
							chargeAmount: '',
							openDate: '',
							gvProductSequenceId: '9',
							upLoadSpeed: '',
							downLoadSpeed: '',
							nextPackage: [],
							priceExcludeVat: '',
							pro5gflg: '',
							productAcctnCat: 'R',
							deviceContractFlg: 'N',
							netFlexiFlg: '',
							crmFlag: '',
							paymentMode: 'Post-paid',
						},
					],
				},
			},
		};

		axios.post = jest.fn();
		ProductPackageService.queryPromotionCurrentPack = jest.fn().mockResolvedValue(mockCurrentPack);
		const res = await request(app).post(`/queryPromotionCurrentPack`).send(body).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockCurrentPack);
	});

	it('should handle when error accured', async () => {
		ProductPackageService.queryPromotionCurrentPack = jest.fn();
		const res = await request(app).post(`/queryPromotionCurrentPack`).send(body).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		axios.post = jest.fn();
		ProductPackageService.queryPromotionCurrentPack = jest
			.fn()
			.mockRejectedValueOnce(new Error('can not query contarct first pack'));
		const res = await request(app).post(`/queryPromotionCurrentPack`).send(body);
		expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
		expect(res.body).toEqual({ message: 'Authentication token missing', success: false });
	});
});

describe('POST product-package /get-packages-by-condition', () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	const body = {
		sanitizedName: 'main-promotion-4g-max-speed-unlimited',
		minimumPackagePrice: 100,
		billingSystem: 'All',
		location: '1100',
		orderType: 'Change Promotion',
		productClass: 'Main',
		province: '',
		disctrict: '',
		subDistrict: '',
		contractPack: {
			firstPackage: 0,
			minPrice: 120,
			initialPackage: 0,
			inPackage: [],
		},
	};

	const mockPack = {
		statusCode: '2000',
		statusDesc: 'Success',
		data: [
			{
				orderNo: '1',
				priority: 1,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 699 บาท',
				promotionCode: 'P17068673',
				detailTH:
					'Net Max Speed UNLIMITED 699 บาท โทร 300 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
			{
				orderNo: '2',
				priority: 2,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 899 บาท',
				promotionCode: 'P17037552',
				detailTH:
					'Net Max Speed UNLIMITED 899 บาท โทร 500 นาที เน็ตไม่จำกัด & AIS SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
			{
				orderNo: '3',
				priority: 3,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 1,299 บาท',
				promotionCode: 'P17037554',
				detailTH:
					'Net Max Speed UNLIMITED 1299 บาท โทร 850นาที เน็ต4Gใช้ไม่อั้นความเร็วสูงสุดไม่เกิน300Mbps และ3Gที่ความเร็วสูงสุดจำนวน 20GB จากนั้นใช้ได้ต่อเนื่องความเร็วสูงสุดไม่เกิน384Kbps & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
			{
				orderNo: '4',
				priority: 4,
				title: 'แพ็กเกจ Net Max Speed UNLIMITED 1,099 บาท',
				promotionCode: 'P17037553',
				detailTH:
					'Net Max Speed UNLIMITED 1099 บาท โทร 650 นาที เน็ตไม่จำกัด & SUPER WiFi ส่วนเกิน:โทร/VDO Call นาทีละ1.50บ., SMS 2.5 บ., MMS 4 บ. 12รอบบิล',
			},
		],
	};

	it('should return current pack with status 200 when call route', async () => {
		axios.post = jest.fn();
		ProductPackageService.getPackagesByConditionData = jest.fn().mockResolvedValue(mockPack);
		const res = await request(app).post(`/get-packages-by-condition`).send(body).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockPack);
	});

	it('should handle when error accured', async () => {
		ProductPackageService.getPackagesByConditionData = jest.fn();
		const res = await request(app).post(`/get-packages-by-condition`).send(body).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		axios.post = jest.fn();
		ProductPackageService.getPackagesByConditionData = jest
			.fn()
			.mockRejectedValueOnce(new Error('can not query contarct first pack'));
		const res = await request(app).post(`/get-packages-by-condition`).send(body);
		expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
		expect(res.body).toEqual({ message: 'Authentication token missing', success: false });
	});
});
