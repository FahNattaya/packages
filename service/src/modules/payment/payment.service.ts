import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { URLConfig } from '../../config/url.config';
import { ICardInfo, ICardInfoResponse } from '../../interfaces/card-info.interface';
import {
	IInstallmentsForPartner,
	IInstallmentsForPartnerResponse,
} from '../../interfaces/Installments-for-partner.interface';
import {
	IBackForPartner,
	IBankRequest,
	IGetBankResponse,
	IPaymentBank,
	IPaymentInstallment,
	IPaymentMethod,
	IPaymentRequest,
	IPaymentResponse,
	IPinCodeByUser,
} from '../../interfaces/payment-method.interface';
import ConfigMenuModel, { ConfigMenuPaymentType } from '../../models/configMC.model';
import { LoanAddressModel } from '../../models/payment.model';

export class PaymentService {
	static async createQrCode(body: any): Promise<any> {
		return body;
	}

	static async getAppleCare(locationCode: string): Promise<IPaymentResponse> {
		const payment = {
			statusCode: '20000',
			statusDesc: 'success',
			payments: [
				{
					cardType: '',
					method: 'CA',
					banks: [],
				},
				{
					cardType: '',
					method: 'CC',
					banks: [],
				},
			],
		};
		try {
			const mapResData: IPaymentResponse = await getPaymentMethod(locationCode, payment as IPaymentResponse);
			const methodFilter = payment.payments.map((item) => item.method);
			const filterData = {
				statusCode: payment.statusCode,
				statusDesc: payment.statusDesc,
				payments: mapResData.payments.filter((item) => methodFilter.includes(item.method)),
			};
			return filterData;
		} catch (error) {
			throw error;
		}
	}

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
			const data = await PaymentService.getPayments(body);
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
			const paymentByTrade = await PaymentService.getPayments({
				tradeProductId: Number(body.tradeProductId),
				tradeNo: body.tradeNo || '',
				locationCode: body.locationCode || '',
			});
			const findConfig: any = await ConfigMenuModel.findOne({ nameConfig: 'outChannelSales_criteria' });
			const exPayment: any = findConfig.configFlow
				.filter((e: any) => e.outChnSalesCode === body.outChnSalesCode)
				.map((exPayment: any) => {
					return exPayment.excPayment;
				});
			const ex = exPayment[0];
			const filteredData = paymentByTrade.payments.filter((item: any) => !ex.includes(item.method));
			const ipaymentResponse: IPaymentResponse = {
				statusCode: paymentByTrade.statusCode,
				statusDesc: paymentByTrade.statusDesc,
				payments: filteredData,
			};
			const result = await getPaymentMethod(body.locationCode || '', ipaymentResponse);
			if (body.installment) {
				const installmentsForPartner = await this.getInstallmentsForPartner(body, headers);
				const installmentForPartnerMethodCC = await mapInstallmentForPartnerMethodCC(
					installmentsForPartner.data,
					body.netprice,
					body.isdevileonly,
					body.locationCode || '',
				);
				const installmentForPartnerMethodLS = await mapInstallmentForPartnerMethodLS(
					installmentsForPartner.data,
					body.netprice,
					body.isdevileonly,
				);
				const filter = result.payments.filter((payment: any) => payment.method !== 'CC' && payment.method !== 'LS');
				filter.push(installmentForPartnerMethodCC);
				filter.push(installmentForPartnerMethodLS);
				const sortByPayment = await sortPayment(filter);
				const iPaymentResponse: IPaymentResponse = {
					statusCode: result.statusCode,
					statusDesc: result.statusDesc,
					payments: sortByPayment,
				};
				return iPaymentResponse;
			} else {
				const paymentMethodNonInstallment = {
					...result,
					payments: result.payments
						.filter((payment) => payment.method !== 'LS')
						.map((payment) => ('banksInstallment' in payment ? { ...payment, banksInstallment: [] } : payment)),
				};
				return paymentMethodNonInstallment;
			}
		} catch (error) {
			throw error;
		}
	}

	static async getQueryCardInfo(body: ICardInfo, headers: any): Promise<ICardInfoResponse> {
		try {
			const response = await axios.post<ICardInfoResponse>(URLConfig.queryCardInfo, body, headers);
			if (response.data) {
				return response.data;
			}
			return response.data;
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

	static async getPaymentPartnerByCampaign(body: IInstallmentsForPartner, header: any): Promise<any> {
		const banksInstallment: any = {};
		const installmentPartner: IInstallmentsForPartnerResponse = await PaymentService.getInstallmentsForPartner(
			body,
			header,
		);

		installmentPartner.data.map((bank: any) => {
			bank.bank.map((data: any) => {
				const bankAbbr = data.bankAbbr;
				if (!banksInstallment[bankAbbr]) {
					banksInstallment[bankAbbr] = {
						bankAbbr: data.bankAbbr,
						bankDescTh: data.bankDescitionEn,
						bankDescEn: data.bankDescitionTh,
						imageUrl: data.image,
						installments: bank.bank
							.filter((filter: any) => filter.bankAbbr === data.bankAbbr)
							.map((installment: any) => {
								return {
									installmentId: installment.id,
									installmentRate: installment.installmentRate | 0,
									installmentTerms: installment.installmentTerm,
									balloonMonth: null,
									minimumAmount: installment.minimumAmount | 0,
									cardDigits: installment.cardDigits | 0,
								};
							})
							.sort((a: any, b: any) => parseInt(a.installmentTerms) - parseInt(b.installmentTerms)),
					};
				}
			});
		});
		const banksInstallmentArray = Object.values(banksInstallment);
		return {
			method: 'CC',
			cardType: 'MIXED',
			banks: banksInstallmentArray,
			banksFullPaid: [],
			banksInstallment: [],
			methodName: 'Credit Card & LS',
			methodNameTh: 'บัตรเครดิต และสินเชื่อ',
		};
	}

	static async loanAddressByName(id: string): Promise<any> {
		try {
			const address = await LoanAddressModel.findOne({ name: id }, { _id: 0, name: 0 });
			return address;
		} catch (error) {
			throw error;
		}
	}

	static async getPinCodeByUser(body: any): Promise<any> {
		try {
            const username = 'omws_stg';
            const password = 'Employee#2022@!PzEmployee#2022@!Pz';
            const domain = 'corp-ais900dev';

            const headers = {
                'Content-Type': 'text/xml',
                'SOAPAction': 'http://tempuri.org/IWS_OM_OMService/OM_WS_GetEmpDetailOnFlagByUser',
				'Authorization': `NTLM ${btoa(`${domain}\\${username}:${password}`)}`
            };

            const requestBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
            <soapenv:Header/>
                <soapenv:Body>
                    <tem:OM_WS_GetEmpDetailOnFlagByUser>
                    <tem:OmCode>OMTESTMYCHANNAL</tem:OmCode>
                    <tem:Username>maneenus</tem:Username>
                    <tem:TempFlag>1</tem:TempFlag>
                    </tem:OM_WS_GetEmpDetailOnFlagByUser>
                </soapenv:Body>
            </soapenv:Envelope>`;

            const axiosInstance = axios.create({
                baseURL: URLConfig.getPinCodeByUser,
                withCredentials: true,
            });

            const response = await axiosInstance.post(URLConfig.getPinCodeByUser,requestBody,{ headers: headers })
                        
            return response.data;
        } catch (error) {
            throw error;
        }
		
	}

	static async ascInfoByAscCode(inASCCode: string): Promise<any> {
		try {
			const response = await axios.get(URLConfig.evAscInfo(inASCCode));
			if (response.data) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async locationInfoByPinCode(inPinCode: string): Promise<any> {
		try {
			const response = await axios.get(URLConfig.evLocationInfo(inPinCode));
			if (response.data) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

async function mapInstallmentForPartnerMethodCC(
	getInstallmentsForPartner: any,
	netPrice: string,
	isdevileonly: string,
	location: string,
): Promise<any> {
	try {
		const banksInstallment: any = {};
		getInstallmentsForPartner
			.filter((check: any) => check.bankFlag === 'Y' && check.handsetOnlyFlag === isdevileonly)
			.map((bank: any) => {
				bank.bank.map((data: any) => {
					const bankAbbr = data.bankAbbr;
					if (!banksInstallment[bankAbbr]) {
						banksInstallment[bankAbbr] = {
							bankAbbr: data.bankAbbr,
							bankDescTh: data.bankDescitionEn,
							bankDescEn: data.bankDescitionTh,
							imageUrl: data.image,
							installments: bank.bank
								.filter((filter: any) => filter.bankAbbr === data.bankAbbr && Number(netPrice >= filter.minimumAmount))
								.map((installment: any) => {
									return {
										installmentId: installment.id,
										installmentRate: installment.installmentRate | 0,
										installmentTerms: installment.installmentTerm,
										balloonMonth: null,
										minimumAmount: installment.minimumAmount | 0,
										cardDigits: installment.cardDigits | 0,
									};
								})
								.sort((a: any, b: any) => parseInt(a.installmentTerms) - parseInt(b.installmentTerms)),
						};
					}
				});
			});

		const banksInstallmentArray = Object.values(banksInstallment);
		const banksFullPaidArray = await getPaymentWithFullCreditCard(location, getInstallmentsForPartner);
		// const findConfig: any = await ConfigMenuModel.find({ nameConfig: 'name_method_payment' });
		// const res = findConfig.configFlow.filter((e: any) => e.method === 'CC');
		const filterbanksInstallmentArray = banksInstallmentArray.filter((e: any) => e.installments.length > 0);
		return {
			method: 'CC',
			cardType: 'MIXED',
			banks: [],
			banksFullPaid: banksFullPaidArray,
			banksInstallment: filterbanksInstallmentArray,
			methodName: 'Credit Card',
			methodNameTh: 'บัตรเครดิต',
		};
	} catch (error) {
		throw error;
	}
}

async function mapInstallmentForPartnerMethodLS(
	getInstallmentsForPartner: any,
	netPrice: string,
	isdevileonly: string,
): Promise<any> {
	try {
		const banksInstallment: any = {};
		getInstallmentsForPartner
			.filter((check: any) => check.bankFlag === 'N' && check.handsetOnlyFlag === isdevileonly)
			.map((bank: any) => {
				bank.bank.map((data: any) => {
					const bankAbbr = data.bankAbbr;
					if (!banksInstallment[bankAbbr]) {
						banksInstallment[bankAbbr] = {
							bankAbbr: data.bankAbbr,
							bankDescTh: data.bankDescitionEn,
							bankDescEn: data.bankDescitionTh,
							imageUrl: data.image,
							installments: bank.bank
								.filter((filter: any) => filter.bankAbbr === data.bankAbbr && Number(netPrice >= filter.minimumAmount))
								.map((installment: any) => {
									return {
										installmentId: installment.id,
										installmentRate: installment.installmentRate | 0,
										installmentTerms: installment.installmentTerm,
										balloonMonth: null,
										minimumAmount: installment.minimumAmount | 0,
										cardDigits: installment.cardDigits | 0,
									};
								})
								.sort((a: any, b: any) => parseInt(a.installmentTerms) - parseInt(b.installmentTerms)),
						};
					}
				});
			});

		const banksInstallmentArray = Object.values(banksInstallment);
		const filterbanksInstallmentArray = banksInstallmentArray.filter((e: any) => e.installments.length > 0);
		// const findConfig: any = await ConfigMenuModel.findOne({ nameConfig: 'name_method_payment' });
		// const res = findConfig.configFlow.filter((e: any) => e.method === 'LS');
		return {
			method: 'LS',
			cardType: '',
			banks: [],
			banksFullPaid: [],
			banksInstallment: filterbanksInstallmentArray,
			methodName: 'Leasing',
			methodNameTh: 'สินเชื่อ',
		};
	} catch (error) {
		throw error;
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
		const banksInstallment: any = {};
		getInstallmentsForPartner
			.filter((check: any) => check.bankFlag === bankFlag && check.handsetOnlyFlag === isdevileonly)
			.map((bank: any) => {
				bank.bank.map((data: any) => {
					const bankAbbr = data.bankAbbr;
					if (!banksInstallment[bankAbbr]) {
						banksInstallment[bankAbbr] = {
							bankAbbr: data.bankAbbr,
							bankDescTh: data.bankDescitionEn,
							bankDescEn: data.bankDescitionTh,
							imageUrl: data.image,
							installments: bank.bank
								.filter((filter: any) => filter.bankAbbr === data.bankAbbr && netPrice >= filter.minimumAmount)
								.map((installment: any) => ({
									installmentId: installment.id,
									installmentRate: installment.installmentRate | 0,
									installmentTerms: installment.installmentTerm,
									balloonMonth: null,
									minimumAmount: installment.minimumAmount | 0,
									cardDigits: installment.cardDigits | 0,
								})),
						};
					}
				});
			});

		const banksProData: IGetBankResponse = await PaymentService.banksPromotion({ location: location });
		const mapBankPromotion: IPaymentBank[] = banksProData.banks?.map((item) => ({
			bankAbbr: item.abb,
			bankDescTh: item.name,
			bankDescEn: item.name,
			imageUrl: item.imageUrl,
		}));
		const paymentWithNoInstallments: IPaymentBank[] = getInstallmentsForPartner
			.filter((item: IPaymentBank) => item?.installments?.length === 0)
			.map((item: IPaymentBank) => ({
				bankAbbr: item.bankAbbr,
				bankDescTh: item.bankDescTh,
				bankDescEn: item.bankDescEn,
				imageUrl: item.imageUrl,
			}));
		const paymentFullPaidMerge: IPaymentBank[] = [...mapBankPromotion, ...paymentWithNoInstallments];
		const removeDuplicateBank = new Set<string>();
		const banksFullPaidArrayData = paymentFullPaidMerge.filter((item: IPaymentBank) => {
			if (!removeDuplicateBank.has(item.bankAbbr)) {
				removeDuplicateBank.add(item.bankAbbr);
				return true;
			}
			return false;
		});

		const banksInstallmentArray = Object.values(banksInstallment);
		const banksFullPaidArray = Object.values(banksFullPaidArrayData);

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
async function sortPayment(payment: any): Promise<IPaymentMethod[]> {
	const desiredMethods = ['CA', 'LS', 'CC'];
	const filteredAndSortedMethods = payment
		.filter((payment: any) => desiredMethods.includes(payment.method))
		.sort((a: any, b: any) => {
			const methodIndexA = desiredMethods.indexOf(a.method);
			const methodIndexB = desiredMethods.indexOf(b.method);
			if (methodIndexA === -1 && methodIndexB === -1) {
				return 0;
			} else if (methodIndexA === -1) {
				return 1;
			} else if (methodIndexB === -1) {
				return -1;
			}
			return methodIndexA - methodIndexB;
		});
	const remainingMethods = payment.filter((payment: any) => !desiredMethods.includes(payment.method));
	const finalPaymentData = {
		payments: [...filteredAndSortedMethods, ...remainingMethods],
	};
	return finalPaymentData.payments;
}

async function getPaymentMethod(location: string, response: IPaymentResponse): Promise<IPaymentResponse> {
	const data: IPaymentBank[][] = response.payments.filter((item) => item.method === 'CC').map((item) => item.banks);
	const paymentCreditCard: IPaymentBank[] = ([] as IPaymentBank[]).concat(...data);
	const paymentWithFullCreditCard: IPaymentBank[] = await getPaymentWithFullCreditCard(location, paymentCreditCard);
	const paymentWithInstallmentCreditCard: IPaymentBank[] = await getPaymentWithInstallmentCreditCard(paymentCreditCard);

	const payments: IPaymentMethod[] = [];
	const filterMethod: string[] = ['CA', 'LS', 'CC'];
	const ducplicateMethod: string[] = [];

	const nameMethod: ConfigMenuPaymentType = await getNameMethod();

	response.payments.forEach((item: IPaymentMethod) => {
		if (!ducplicateMethod.includes(item.method) && filterMethod.includes(item.method)) {
			ducplicateMethod.push(item.method);

			let payment: IPaymentMethod;

			if (item.method === 'CA') {
				payment = {
					method: 'CA',
					cardType: '',
					banks: [],
					banksFullPaid: [],
					banksInstallment: [],
					methodName: 'Cash',
					methodNameTh: 'เงินสด (เต็มจำนวน)',
				};
			} else if (item.method === 'LS') {
				payment = {
					method: 'LS',
					cardType: '',
					banks: [],
					banksFullPaid: [],
					banksInstallment: [],
					methodName: 'Leasing',
					methodNameTh: 'สินเชื่อ',
				};
			} else if (item.method === 'CC') {
				payment = {
					method: 'CC',
					cardType: 'MIXED',
					banks: [],
					banksFullPaid: paymentWithFullCreditCard,
					banksInstallment: paymentWithInstallmentCreditCard,
					methodName: 'Credit Card',
					methodNameTh: 'เครดิตการ์ด',
				};
			} else {
				return;
			}
			payments.push(payment);
		}
	});

	const filteredData = response.payments.filter((item) => !['CC', 'CA', 'LS'].includes(item.method));
	const convertedArray = filteredData.map((item) => {
		const matchingMethod = nameMethod.configFlow.find((config) => config.method === item.method);
		return {
			method: item.method,
			cardType: item.cardType,
			banks: item.banks,
			banksFullPaid: [],
			banksInstallment: [],
			methodName: matchingMethod ? matchingMethod.methodName : '',
			methodNameTh: matchingMethod ? matchingMethod.methodNameTh : '',
		};
	});
	const mapres = [...payments, ...convertedArray];

	const paymentsSort = await sortPayment(mapres);

	const resultData: IPaymentResponse = {
		statusCode: response.statusCode,
		statusDesc: response.statusDesc,
		payments: paymentsSort,
	};

	return resultData;
}

async function getPaymentWithFullCreditCard(
	location: string,
	paymentByCreditCard: IPaymentBank[],
): Promise<IPaymentBank[]> {
	const banksProData: IGetBankResponse = await PaymentService.banksPromotion({ location: location });
	const mapBankPromotion: IPaymentBank[] = banksProData.banks?.map((item) => ({
		bankAbbr: item.abb,
		bankDescTh: item.name,
		bankDescEn: item.name,
		imageUrl: item.imageUrl,
	}));

	const paymentWithNoInstallments: IPaymentBank[] = paymentByCreditCard
		.filter((item: IPaymentBank) => item?.installments?.length === 0)
		.map((item: IPaymentBank) => ({
			bankAbbr: item.bankAbbr,
			bankDescTh: item.bankDescTh,
			bankDescEn: item.bankDescEn,
			imageUrl: item.imageUrl,
		}));

	const paymentFullPaidMerge: IPaymentBank[] = [...mapBankPromotion, ...paymentWithNoInstallments];

	const removeDuplicateBank = new Set<string>();

	const paymentFullPaid = paymentFullPaidMerge.filter((item: IPaymentBank) => {
		if (!removeDuplicateBank.has(item.bankAbbr)) {
			removeDuplicateBank.add(item.bankAbbr);
			return true;
		}
		return false;
	});

	return paymentFullPaid;
}

async function getPaymentWithInstallmentCreditCard(paymentByCreditCard: IPaymentBank[]): Promise<IPaymentBank[]> {
	const groupedMap = new Map<string, IPaymentBank>();

	paymentByCreditCard.forEach((item: IPaymentBank) => {
		if (groupedMap.has(item.bankAbbr)) {
			const existingItem = groupedMap.get(item.bankAbbr);
			existingItem?.installments?.push(...(item?.installments || []));
		} else {
			groupedMap.set(item.bankAbbr, { ...item });
		}
	});

	const paymentInstallment: IPaymentBank[] = Array.from(groupedMap.values());

	const removeDuplicateInstallmentId = new Set<string>();

	paymentInstallment.forEach((item) => {
		item.installments = item?.installments?.filter((installment: IPaymentInstallment) => {
			if (!removeDuplicateInstallmentId.has(installment.installmentId)) {
				removeDuplicateInstallmentId.add(installment.installmentId);
				return true;
			}
			return false;
		});
	});

	const paymentInstallmentSorted = paymentInstallment.map((bank) => ({
		...bank,
		installments: bank?.installments?.sort((a, b) => parseInt(a.installmentTerms) - parseInt(b.installmentTerms)),
	}));

	return paymentInstallmentSorted;
}

async function getNameMethod(): Promise<ConfigMenuPaymentType> {
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
