import axios from 'axios';
import { URLConfig } from '../../config/url.config';
import {
	IInstallmentsForPartner,
	IInstallmentsForPartnerResponse,
} from '../../interfaces/Installments-for-partner.interface';
import {
	IBackForPartner,
	IBankRequest,
	IBuildPaymentResult,
	IGetBankResponse,
	IPaymentBank,
	IPaymentMethod,
	IPaymentRequest,
	IPaymentResponse,
} from '../../interfaces/payment-method.interface';
import ConfigMenuModel, { ConfigFlow, ConfigMenuPaymentType } from '../../models/configMC.model';
import { LoanAddressModel } from '../../models/payment.model';

export class PaymentTestService {
	static async banksPromotion(body: IBankRequest): Promise<IGetBankResponse> {
		try {
			const response = await axios.post(URLConfig.getBanksPromotion, body);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async getPayments(body: IPaymentRequest): Promise<IPaymentResponse> {
		try {
			const response = await axios.post(URLConfig.getPayments, body);

			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async getPaymentsWithCondition(body: IPaymentRequest): Promise<IPaymentResponse> {
		try {
			const data = await PaymentTestService.getPayments(body);
			if (data) {
				const paymentCreditCard: IPaymentResponse = await getPaymentMethod(body.locationCode, data);

				return paymentCreditCard;
			}
			return data;
		} catch (error) {
			throw error;
		}
	}

	static async getPaymentsForPartner(body: IBackForPartner, headers: any): Promise<IPaymentResponse> {
		try {
			const paymentByTrade = await PaymentTestService.getPayments({
				tradeProductId: Number(body.tradeProductId),
				tradeNo: body.tradeNo || '',
				locationCode: body.locationCode || '',
			});
			const outChannelSales: any = await ConfigMenuModel.findOne({ nameConfig: 'outChannelSales_criteria' });
			const exPayment =
				outChannelSales.configFlow.find((config: any) => config.outChnSalesCode === body.outChnSalesCode)?.excPayment ||
				[];

			const filteredPayments = paymentByTrade.payments.filter((payment: any) => !exPayment.includes(payment.method));

			const ipaymentResponse: any = {
				statusCode: paymentByTrade.statusCode,
				statusDesc: paymentByTrade.statusDesc,
				payments: filteredPayments,
			};
			const result = await getPaymentMethod(body.locationCode || '', ipaymentResponse);

			if (body.installment) {
				const installmentsForPartner = await this.getInstallmentsForPartner(body, headers);
				const installmentCC = await mapInstallments(
					installmentsForPartner.data,
					body.netprice,
					body.isdevileonly,
					'Y',
					'CC',
					'Credit Card',
					'บัตรเครดิต',
					body.locationCode || '',
				);
				const installmentLS = await mapInstallments(
					installmentsForPartner.data,
					body.netprice,
					body.isdevileonly,
					'N',
					'LS',
					'Leasing',
					'สินเชื่อ',
					body.locationCode || '',
				);
				const nonCCOrLS = result.payments.filter((payment: any) => payment.method !== 'CC' && payment.method !== 'LS');
				const sortedPayments = await sortPayment([...nonCCOrLS, installmentCC, installmentLS]);
				return {
					statusCode: result.statusCode,
					statusDesc: result.statusDesc,
					payments: sortedPayments,
				};
			} else {
				const nonLS = result.payments.filter((payment: any) => payment.method !== 'LS');
				const cleanedPayments = nonLS.map((payment: any) =>
					'banksInstallment' in payment ? { ...payment, banksInstallment: [] } : payment,
				);

				return {
					...result,
					payments: cleanedPayments,
				};
			}
		} catch (error) {
			throw error;
		}
	}

	static async getInstallmentsForPartner(
		body: IInstallmentsForPartner,
		headers: any,
	): Promise<IInstallmentsForPartnerResponse> {
		try {
			const response = await axios.post<IInstallmentsForPartnerResponse>(
				URLConfig.getInstallmentsForPartner,
				body,
				headers,
			);
			if (response.data) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async loanAddressByName(id: string): Promise<any> {
		try {
			const address = await LoanAddressModel.findOne({ name: id }, { _id: 0, name: 0 });
			return address;
		} catch (error) {
			throw error;
		}
	}
}

async function mapInstallments(
	getInstallmentsForPartner: any,
	netPrice: string,
	isdevileonly: string,
	bankFlag: string,
	method: string,
	methodName: string,
	methodNameTh: string,
	location: string,
): Promise<any> {
	try {
		const banksInstallment = getInstallmentsForPartner
			.filter((installment: any) => installment.bankFlag === bankFlag && installment.handsetOnlyFlag === isdevileonly)
			.reduce((acc: any, current: any) => {
				current.bank.forEach((data: any) => {
					if (!acc[data.bankAbbr] && netPrice >= data.minimumAmount) {
						acc[data.bankAbbr] = {
							bankAbbr: data.bankAbbr,
							bankDescTh: data.bankDescitionEn,
							bankDescEn: data.bankDescitionTh,
							imageUrl: data.image,
							installments: current.bank
								.filter((bank: any) => bank.bankAbbr === data.bankAbbr && Number(netPrice >= bank.minimumAmount))
								.map((installment: any) => ({
									installmentId: installment.id,
									installmentRate: installment.installmentRate | 0,
									installmentTerms: installment.installmentTerm,
									balloonMonth: null,
									minimumAmount: installment.minimumAmount | 0,
									cardDigits: installment.cardDigits | 0,
								}))
								.sort((a: any, b: any) => parseInt(a.installmentTerms) - parseInt(b.installmentTerms)),
						};
					}
				});
				return acc;
			}, {} as Record<string, any>);
		const banksInstallmentArray = Object.values(banksInstallment);
		const banksFullPaidArray = await getPaymentWithFullCreditCard(location, getInstallmentsForPartner);

		return {
			method,
			cardType: method === 'CC' ? 'MIXED' : '',
			banks: [],
			banksFullPaid: method === 'CC' ? banksFullPaidArray : [],
			banksInstallment: banksInstallmentArray,
			methodName,
			methodNameTh,
		};
	} catch (error) {
		throw error;
	}
}
async function sortPayment(payments: any): Promise<IPaymentMethod[]> {
	const desiredMethods = ['CA', 'LS', 'CC'];

	const getSortIndex = (method: string) => desiredMethods.indexOf(method);

	const finalizePaymentData = (payment: any) => ({
		...payment,
		banksFullPaid: payment.banksFullPaid || [],
		banksInstallment: payment.banksInstallment || [],
	});

	const sortedPayments = payments
		.sort((a: any, b: any) => {
			const indexA = getSortIndex(a.method);
			const indexB = getSortIndex(b.method);
			return indexA - indexB;
		})
		.map(finalizePaymentData);

	return sortedPayments;
}

async function getPaymentMethod(location: string, response: IPaymentResponse): Promise<IPaymentResponse> {
	const { payments, statusCode, statusDesc } = response;
	const creditCardPayments = payments.filter((item: any) => item.method === 'CC');
	const paymentCreditCard = creditCardPayments.flatMap((item: any) => item.banks);
	const paymentWithFullCreditCard: IPaymentBank[] = await getPaymentWithFullCreditCard(location, paymentCreditCard);
	const paymentWithInstallmentCreditCard: IPaymentBank[] = await getPaymentWithInstallmentCreditCard(paymentCreditCard);
	const filterMethod: string[] = ['CA', 'LS', 'CC'];

	const nameMethod: ConfigMenuPaymentType = await getNameMethod();

	const buildPayment = (item: any): IBuildPaymentResult => {
		const { method, cardType, banks } = item;
		const config: ConfigFlow =
			nameMethod.configFlow.find((config: any) => config.method === method) || ({} as ConfigFlow);
		return {
			method,
			cardType: method === 'CC' ? 'MIXED' : '',
			banks: banks || [],
			banksFullPaid: [],
			banksInstallment: [],
			methodName: config?.methodName || '',
			methodNameTh: config?.methodNameTh || '',
		};
	};

	const specialPayments: any[] = [];
	const otherPayments: any[] = [];
	const specialMethods = new Set();

	response.payments.forEach((item: any) => {
		if (filterMethod.includes(item.method) && !specialMethods.has(item.method)) {
			specialMethods.add(item.method);
			const payment = buildPayment(item);
			if (payment.method === 'CC') {
				payment.banksFullPaid = paymentWithFullCreditCard;
				payment.banksInstallment = paymentWithInstallmentCreditCard;
			}
			specialPayments.push(payment);
		} else if (!filterMethod.includes(item.method)) {
			const payment = buildPayment(item);
			otherPayments.push(payment);
		}
	});

	const sortedPayments = await sortPayment([...otherPayments, ...specialPayments]);

	return {
		statusCode,
		statusDesc,
		payments: sortedPayments,
	};
}

async function getPaymentWithFullCreditCard(
	location: string,
	paymentByCreditCard: IPaymentBank[],
): Promise<IPaymentBank[]> {
	const banksProData: IGetBankResponse = await PaymentTestService.banksPromotion({ location: location });
	const uniqueBanks = new Set<string>();
	const mapBankPromotion = mapBanksFromPromotion(banksProData);
	const noInstallmentPayments = filterNoInstallmentPayments(paymentByCreditCard);

	const mergedPayments = [...mapBankPromotion, ...noInstallmentPayments];
	const uniquePayments = filterUniquePayments(mergedPayments, uniqueBanks);

	return uniquePayments;
}

function mapBanksFromPromotion(banksProData: any): any[] {
	return (
		banksProData.banks?.map((item: any) => ({
			bankAbbr: item.abb,
			bankDescTh: item.name,
			bankDescEn: item.name,
			imageUrl: item.imageUrl,
		})) || []
	);
}

function filterNoInstallmentPayments(paymentByCreditCard: any[]): any[] {
	return paymentByCreditCard
		.filter((item: any) => item?.installments?.length)
		.map((item: any) => ({
			bankAbbr: item.bankAbbr,
			bankDescTh: item.bankDescTh,
			bankDescEn: item.bankDescEn,
			imageUrl: item.imageUrl,
		}));
}

function filterUniquePayments(mergedPayments: any[], uniqueBanks: Set<string>): any[] {
	return mergedPayments.filter((item: any) => {
		if (!uniqueBanks.has(item.bankAbbr)) {
			uniqueBanks.add(item.bankAbbr);
			return true;
		}
		return false;
	});
}

async function getPaymentWithInstallmentCreditCard(paymentByCreditCard: any[]): Promise<any[]> {
	const groupedMap = await groupPaymentByBank(paymentByCreditCard);
	const paymentInstallment = Array.from(groupedMap.values());

	filterDuplicateInstallments(paymentInstallment);

	const paymentInstallmentSorted = paymentInstallment.map((bank) => ({
		...bank,
		installments: bank?.installments?.sort(
			(a: any, b: any) => parseInt(a.installmentTerms) - parseInt(b.installmentTerms),
		),
	}));

	return paymentInstallmentSorted;
}

async function groupPaymentByBank(paymentByCreditCard: any[]): Promise<Map<string, any>> {
	const groupedMap = new Map<string, any>();
	paymentByCreditCard.forEach((item: any) => {
		if (groupedMap.has(item.bankAbbr)) {
			const existingItem = groupedMap.get(item.bankAbbr);
			existingItem?.installments?.push(...(item?.installments || []));
		} else {
			groupedMap.set(item.bankAbbr, { ...item });
		}
	});
	return groupedMap;
}

function filterDuplicateInstallments(paymentInstallment: any[]): void {
	const removeDuplicateInstallmentId = new Set<string>();
	paymentInstallment.forEach((item) => {
		item.installments = item?.installments?.filter((installment: any) => {
			if (!removeDuplicateInstallmentId.has(installment.installmentId)) {
				removeDuplicateInstallmentId.add(installment.installmentId);
				return true;
			}
			return false;
		});
	});
}

export async function getNameMethod(): Promise<ConfigMenuPaymentType> {
	try {
		const methodNameConfig = (await ConfigMenuModel.findOne(
			{ nameConfig: 'name_method_payment' },
			{ _id: 0 },
		)) as ConfigMenuPaymentType;
		return methodNameConfig;
	} catch (error) {
		throw error;
	}
}
