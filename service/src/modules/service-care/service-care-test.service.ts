import axios from 'axios';
import { URLConfig } from '../../config/url.config';
import {
	IDataPromotionsByShelfResponse,
	IGetAllPromotionsByShelfResponse,
} from '../../interfaces/care-response.interface';
import {
	ICareCondition,
	ICarePlus,
	ICarePlusBody,
	IGetAllPromotionsByShelf,
	IGetPromotionShelves,
	IGetPromotionShelvesResponse,
	IListCrossProduct,
	IListMainProduct,
} from '../../interfaces/cpc.interface';
import { PromotionService } from '../promotion/promotion.service';

const getPriceWithPercentage = (price: string, percentage: number) => (Number(price) * percentage) / 100 + '';
const convertPrice = (price: string) => parseFloat(price || '0').toLocaleString();

const mapProtection = () => [
	{ name: 'hardware', isProtect: true },
	{ name: 'accident', isProtect: true },
	{ name: 'missing', isProtect: true },
];

const mapCondition = (body: ICarePlusBody) => [
	{ detail: `Exchange service 25%`, price: convertPrice(getPriceWithPercentage(body.handsetPrice, 25)) },
	{ detail: 'Exchange service 42.5%', price: convertPrice(getPriceWithPercentage(body.handsetPrice, 42.5)) },
];

const mapServiceType = (sort: IDataPromotionsByShelfResponse[]) => ({
	title: 'AIS Mobile Care',
	option: sort.map((e) => ({
		name: e.title || 'null',
		price: e.customAttributes.priceIncVat,
		promotionCode: e.customAttributes.promotionCode || '',
	})),
});

const sortByPrice = (array: any, order: 'asc' | 'desc' = 'asc') => {
	return array.sort((ref: any, comparer: any) => {
		const priceDifference = ref.customAttributes.priceInclVat - comparer.customAttributes.priceInclVat;
		return order === 'asc' ? priceDifference : -priceDifference;
	});
};

const extractCrossProducts = (mainProducts: IListMainProduct[]) => {
	if (!mainProducts) {
		console.error('mainProducts is undefined');
		return [];
	}
	return mainProducts.flatMap((product) => product.listCrossProduct);
};

const filterByDevicePrice = (data: any, handsetPrice: string) =>
	data.filter((ref: any) => {
		const endUserPrice = handsetPrice;
		const startDevicePrice = ref.customAttributes.startDevicePrice;
		const endDevicePrice = ref.customAttributes.endDevicePrice;
		return Number(endUserPrice) >= Number(startDevicePrice) && Number(endUserPrice) <= Number(endDevicePrice);
	});

const filterRecurringPrice = (data: any) =>
	data.sort((ref: any, comparer: any) => {
		const refPriceType = ref.customAttributes.priceType;
		const comparerPriceType = comparer.customAttributes.priceType;
		if (refPriceType == 'Recurring' && comparerPriceType != 'Recurring') return -1;
		else if (refPriceType != 'Recurring' && comparerPriceType == 'Recurring') return 1;
		else return 0;
	});

const extractAppleProtection = (listCrossProduct: IListCrossProduct[]): ICareCondition[] =>
	listCrossProduct.reduce((acc, crossProduct) => {
		acc.push(
			{ detail: 'ซ่อมหน้าจอ', price: convertPrice(crossProduct.swapPrice) },
			{ detail: 'เปลี่ยนเครื่อง iPhone', price: convertPrice(crossProduct.replacePrice) },
		);
		return acc;
	}, [] as ICareCondition[]);

const productCrossSelling = async (body: ICarePlusBody) => {
	try {
		const responseApple = await axios.post(URLConfig.queryProductCrossSelling, {
			productType: body.productType,
			productSubType: body.productSubType,
			brand: body.brand,
			model: body.model,
			projectGroup: 'APPLE CARE PLUS',
			matCode: body.matCode ? body.matCode : '',
			activeDate: body.activeDate,
		});
		return responseApple.data;
	} catch (error) {
		const iGetPromotionShelvesResponse: IGetPromotionShelvesResponse = {
			statusCode: '4000',
			statusDesc: `Error function productCrossSelling ${String(error)}`,
			data: [],
		};
		return iGetPromotionShelvesResponse;
	}
};

const filterApplePromotions = async (body: ICarePlusBody, promotions: any) => {
	try {
		const responseApple = await productCrossSelling(body);
		const listCrossProduct = extractCrossProducts(responseApple.listMainProduct);
		const validCrossProducts = listCrossProduct.filter((product) => !('endDate' in product));
		if (validCrossProducts.length === 0) return {};
		const appleProtection = extractAppleProtection(validCrossProducts);

		const responseCarePlusArray: ICarePlus[] = [];
		const filterPromotionApple = promotions.data.find((promotion: IDataPromotionsByShelfResponse) =>
			listCrossProduct.some((crossProduct: IListCrossProduct) =>
				crossProduct.priceIncVat.includes(promotion.customAttributes.priceIncVat),
			),
		);

		if (filterPromotionApple) {
			const years = filterPromotionApple.customAttributes.duration
				? (+filterPromotionApple.customAttributes.duration / 12) | 0
				: 0;
			const priceFilter =
				listCrossProduct.find((crossProduct: { priceIncVat: string | any[] }) =>
					crossProduct.priceIncVat.includes(filterPromotionApple.customAttributes.priceIncVat),
				)?.priceIncVat || '';

			const responseCarePlus: ICarePlus = {
				productType: 'AppleCare+',
				service: `ดูแลเครื่อง ${years} ปี`,
				protection: [
					{
						name: 'Hardware & Software',
						isProtect: true,
					},
					{
						name: 'เครื่องเสียจากอุบัติเหตุ',
						isProtect: true,
					},
					{
						name: 'เครื่องหาย',
						isProtect: false,
					},
				],
				condition: appleProtection,
				serviceFee: 'ชำระเงินทันที',
				serviceType: {
					title: filterPromotionApple.title,
					option: [
						{
							name: filterPromotionApple.detailTH,
							price: convertPrice(priceFilter),
							promotionCode: filterPromotionApple.customAttributes.promotionCode,
						},
					],
				},
			};
			responseCarePlusArray.push(responseCarePlus);
		}
		return responseCarePlusArray;
	} catch (error) {}
};

const mapResponseData = (sort: any, body: any, language: string): ICarePlus => ({
	productType: 'AIS Care Plus',
	service: language === 'EN' ? 'Up to 4 years warranty' : 'รับประกันสูงสุด 4 ปี',
	protection: mapProtection(),
	condition: mapCondition(body),
	serviceFee: language === 'EN' ? 'charge according to the invoice' : 'เรียกเก็บตามใบแจ้ง',
	serviceType: mapServiceType(sort),
});

export const getCarePromotionsByShelfTest = async (body: ICarePlusBody): Promise<any> => {
	try {
		const dataResponse = [];
		const otherPromotionShelves: IGetPromotionShelves = {
			userId: String(process.env.USERID_APPLE_CARE),
			language: body.language,
		};
		const responseGetPromotionShelves: IGetPromotionShelvesResponse = await PromotionService.getPromotionShelves(
			otherPromotionShelves,
		);
		if (responseGetPromotionShelves.statusCode !== '2000') return responseGetPromotionShelves;

		const otherAllPromotion: IGetAllPromotionsByShelf = {
			userId: `${process.env.USERID_APPLE_CARE}`,
			sanitizedName: responseGetPromotionShelves.data[0].sanitizedName,
			parameters: [{ name: 'title', value: responseGetPromotionShelves.data[0].title }],
		};
		const getAllPromotion: IGetAllPromotionsByShelfResponse = await PromotionService.getAllPromotionsByShelf(
			otherAllPromotion,
		);
		if (getAllPromotion.statusCode !== '2000') return responseGetPromotionShelves;

		const filteredByDevicePrice = filterByDevicePrice(getAllPromotion.data, body.handsetPrice);
		const filteredRecurringPrice = filterRecurringPrice(filteredByDevicePrice);
		const sortedByPrice = sortByPrice(filteredRecurringPrice, 'asc');

		const mapMobileCareRes = mapResponseData(sortedByPrice, body, body.language);
		dataResponse.push(mapMobileCareRes);

		const filterApple = await filterApplePromotions(body, getAllPromotion);
		dataResponse.push(filterApple);

		return { statusCode: '2000', statusDesc: 'SUCCESS', data: dataResponse };
	} catch (error) {
		return `Error function getCarePromotionsByShelf ${error}`;
	}
};
