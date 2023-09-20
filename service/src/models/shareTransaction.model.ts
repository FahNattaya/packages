import moment from 'moment';
import mongoose from 'mongoose';
import { Util } from '../util';
const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;

const util = new Util();
// const encryptsecret = util.decryptDataKey(process.env.MONGOOSE_ENCRYPT.MASTER_KEY!, process.env.ENCRYPTED_DATA_KEY!);
const encryptsecret = util.decryptDataKey(
	`5yj;mv'dkiNgfho8iyho=ujwmNvijvp`,
	`735d7927386b6c792764746c7539694d:46b8386bac1d9992e836f5cbc9d8ab8622d8bc8ad09cd25683c4d788e3a1dc9da3f4de88148da512e20e564a424e24ef`,
);
const encryptsaltGenerator = `s]y'8kly'dtlu9iM`;
const memberSimCardSchema = new mongoose.Schema(
	{
		mobileNo: {
			type: String,
		},
		simSerial: {
			type: String,
		},
		persoSim: {
			type: mongoose.Schema.Types.Mixed,
		},
		chargeType: {
			type: String,
		},
		pinCode: {
			type: String,
		},
		reasonCode: {
			type: String,
		},
	},
	{ autoCreate: false, _id: false },
);
memberSimCardSchema.plugin(mongooseFieldEncryption, {
	fields: ['mobileNo', 'pinCode'],
	secret: encryptsecret,
	saltGenerator: () => {
		return encryptsaltGenerator;
	},
});

const simCardSchema = new mongoose.Schema(
	{
		mobileNo: {
			type: String,
			required: false,
			default: null,
		},
		billingSystem: {
			type: String,
		},
		chargeType: {
			type: String,
		},
		simSerial: {
			type: String,
			required: false,
			default: null,
		},
		persoSim: {
			type: String,
		},
		isAis: {
			type: Boolean,
		},
		mobileNoDevice: {
			type: String,
		},
		memberSimCard: [memberSimCardSchema],
		imei: { type: String, required: false, default: null },
	},
	{ autoCreate: false, _id: false },
);
simCardSchema.plugin(mongooseFieldEncryption, {
	fields: ['mobileNo', 'mobileNoDevice'],
	secret: encryptsecret,
	saltGenerator: () => {
		return encryptsaltGenerator;
	},
});

const customerSchema = new mongoose.Schema(
	{
		idCardNo: { type: String, required: false, default: null },
		idCardType: {
			type: String,
			required: false,
			default: null,
		},
		titleName: {
			type: String,
			required: false,
			default: null,
		},
		firstName: {
			type: String,
			required: false,
			default: null,
		},
		lastName: {
			type: String,
			required: false,
			default: null,
		},
		birthdate: {
			type: String,
			required: false,
			default: null,
		},
		gender: {
			type: String,
			required: false,
			default: null,
		},
		expireDate: {
			type: String,
			required: false,
			default: null,
		},
		homeNo: {
			type: String,
			required: false,
			default: null,
		},
		moo: {
			type: String,
			required: false,
			default: null,
		},
		mooBan: {
			type: String,
			required: false,
			default: null,
		},
		room: {
			type: String,
			required: false,
			default: null,
		},
		floor: {
			type: String,
			required: false,
			default: null,
		},
		buildingName: {
			type: String,
			required: false,
			default: null,
		},
		soi: {
			type: String,
			required: false,
			default: null,
		},
		street: {
			type: String,
			required: false,
			default: null,
		},
		province: {
			type: String,
			required: false,
			default: null,
		},
		amphur: {
			type: String,
			required: false,
			default: null,
		},
		tumbol: {
			type: String,
			required: false,
			default: null,
		},
		zipCode: {
			type: String,
			required: false,
			default: null,
		},
		citizenship: {
			type: String,
			required: false,
			default: null,
		},
		accountSubCat: {
			type: String,
			required: false,
			default: null,
		},
		engFlag: {
			type: String,
			required: false,
			default: null,
		},
		billLanguage: {
			type: String,
			required: false,
			default: null,
		},
		isKYC: {
			type: Boolean,
			required: false,
			default: false,
		},
		isOCR: {
			type: Boolean,
			required: false,
			default: false,
		},
		mainMobile: {
			type: String,
		},
		mainPhone: {
			type: String,
		},
		firstNameEn: {
			type: String,
		},
		lastNameEn: {
			type: String,
		},
		emailAddress: {
			type: String,
		},
		country: {
			type: String,
		},
	},
	{ strict: false, autoCreate: false, _id: false },
);
customerSchema.plugin(mongooseFieldEncryption, {
	fields: [
		'idCardNo',
		'firstName',
		'lastName',
		'birthdate',
		'homeNo',
		'moo',
		'mooBan',
		'room',
		'floor',
		'buildingName',
		'street',
		'soi',
		'tumbol',
		'amphur',
		'province',
		'zipCode',
		'mainMobile',
		'mainPhone',
		'firstNameEn',
		'lastNameEn',
		'emailAddress',
	],
	secret: encryptsecret,
	saltGenerator: () => {
		return encryptsaltGenerator;
	},
});

const billingSchema = new mongoose.Schema(
	{
		customer: customerSchema,
		mobileNumberContact: { type: String },
		phoneNumberContact: { type: String },
		isNewBAFlag: { type: mongoose.Schema.Types.Mixed },
		billCycle: { type: String },
		billCycles: {
			type: Array,
			from: {
				type: String,
				required: false,
				default: null,
			},
			to: {
				type: String,
				required: false,
				default: null,
			},
		},
		billMedia: { type: String },
		emailAddress: { type: String },
		email: { type: String },
		overRuleStartDate: { type: String },
	},
	{ autoCreate: false, _id: false },
);
billingSchema.plugin(mongooseFieldEncryption, {
	fields: ['phoneNumberContact', 'mobileNumberContact', 'emailAddress'],
	secret: encryptsecret,
	saltGenerator: () => {
		return encryptsaltGenerator;
	},
});

const receiptSchema = new mongoose.Schema(
	{
		billCycles: {
			type: Array,
		},
		receiptNo: {
			type: String,
			required: false,
			default: null,
		},
		receiptDate: {
			type: String,
			required: false,
			default: null,
		},
		customer: customerSchema,
		receiptNoCarePlus: {
			type: String,
		},
		salePrice: {
			type: String,
		},
		payAdvanceReceiptDate: {
			type: String,
		},
		payAdvanceReceipt: {
			type: String,
		},
		locationCode: {
			type: String,
		},
		telNo: {
			type: String,
		},
		locationName: {
			type: String,
		},
	},
	{ autoCreate: false, _id: false },
);
receiptSchema.plugin(mongooseFieldEncryption, {
	fields: ['telNo'],
	secret: encryptsecret,
	saltGenerator: () => {
		return encryptsaltGenerator;
	},
});

const deviceCarePaymentSchema = new mongoose.Schema(
	{
		tranId: {
			type: String,
			required: false,
			default: null,
		},
		tranDtm: {
			type: String,
			required: false,
			default: null,
		},
		status: {
			type: String,
			required: false,
			default: null,
		},
		startDtm: {
			type: String,
			required: false,
			default: null,
		},
		qrType: {
			type: String,
			required: false,
			default: null,
		},
		orderId: {
			type: String,
			required: false,
			default: null,
		},
		offerId: {
			type: String,
			required: false,
			default: null,
		},
		lastUpdate: {
			type: String,
			required: false,
			default: null,
		},
		amount: {
			type: String,
			required: false,
			default: null,
		},
		paymentMethod: {
			type: String,
			required: false,
			default: null,
		},
		paymentType: {
			type: String,
			required: false,
			default: null,
		},
		creditCardNo: {
			type: String,
			required: false,
			default: null,
		},
		cardExpireDate: {
			type: String,
			required: false,
			default: null,
		},
		bankAbbr: {
			type: String,
			required: false,
			default: null,
		},
		email: {
			type: String,
			required: false,
			default: null,
		},
	},
	{ autoCreate: false, _id: false },
);
deviceCarePaymentSchema.plugin(mongooseFieldEncryption, {
	fields: ['email'],
	secret: encryptsecret,
	saltGenerator: () => {
		return encryptsaltGenerator;
	},
});

const mobileCarePackagetSchema = new mongoose.Schema(
	{
		accountFees: {
			type: Array,
		},
		orderFees: {
			type: Array,
		},
		title: {
			type: String,
			required: false,
			default: null,
		},
		promotionCode: {
			type: String,
			required: false,
			default: null,
		},
		customAttributes: {
			promotionName: {
				type: String,
				required: false,
				default: null,
			},
			promotionCode: {
				type: String,
				required: false,
				default: null,
			},
			offeringCode: {
				type: String,
				required: false,
				default: null,
			},
		},
		email: {
			type: String,
			required: false,
			default: null,
		},
		reason: {
			type: String,
			required: false,
			default: null,
		},
		detailTH: {
			type: String,
		},
		detailEN: {
			type: String,
		},
		thumbnail: {
			type: String,
		},
	},
	{ autoCreate: false, _id: false },
);
mobileCarePackagetSchema.plugin(mongooseFieldEncryption, {
	fields: ['email'],
	secret: encryptsecret,
	saltGenerator: () => {
		return encryptsaltGenerator;
	},
});

const shareTransactions = new mongoose.Schema(
	{
		TRANSACTION_ID: {
			type: String,
			required: false,
		},
		DATA: {
			action: {
				type: String,
				required: false,
				default: null,
			},
			transactionType: {
				type: String,
				required: false,
				default: null,
			},
			tradeType: {
				type: String,
				required: false,
				default: null,
			},
			customer: customerSchema,
			sim_card: simCardSchema,
			device: {
				amount: {
					type: String,
					required: false,
					default: null,
				},
				brand: {
					type: String,
					required: false,
					default: null,
				},
				model: {
					type: String,
					required: false,
					default: null,
				},
				colorCode: {
					type: String,
					required: false,
					default: null,
				},
				colorName: {
					type: String,
					required: false,
					default: null,
				},
				company: {
					type: String,
					required: false,
					default: null,
				},
				name: {
					type: String,
					required: false,
					default: null,
				},
				matCode: {
					type: String,
					required: false,
					default: null,
				},
				price: {
					type: String,
					required: false,
					default: null,
				},
				imei: {
					type: String,
					required: false,
					default: null,
				},
				imageUrl: {
					type: String,
					required: false,
					default: null,
				},
				productType: {
					type: String,
					required: false,
					default: null,
				},
				productSubType: {
					type: String,
					required: false,
					default: null,
				},
			},
			billing_information: billingSchema,
			knoxguard: {
				type: Object,
			},
			mobile_care_package: mobileCarePackagetSchema,
			device_care_package: {
				productType: {
					type: String,
					required: false,
					default: null,
				},
				title: {
					type: String,
					required: false,
					default: null,
				},
				email: {
					type: String,
					required: false,
					default: null,
				},
				customAttributes: {
					type: Object,
					require: true,
					promotionName: {
						type: String,
						required: false,
						default: null,
					},
					promotionCode: {
						type: String,
						required: false,
						default: null,
					},
				},
				reason: {
					type: String,
					required: false,
					default: null,
				},
				isBuyDeviceCare: {
					type: Boolean,
					required: false,
					default: false,
				},
				crossMatCode: {
					type: String,
					required: false,
					default: null,
				},
				costProductPrice: {
					type: String,
					required: false,
					default: null,
				},
				orderFees: {
					type: Array,
					billingSystem: {
						type: String,
					},
					productCode: {
						type: String,
					},
					productName: {
						type: String,
					},
					priceExclVat: {
						type: Number,
					},
					priceInclVat: {
						type: Number,
					},
					productType: {
						type: String,
					},
					wordInStatementThai: {
						type: String,
					},
					wordInStatementEng: {
						type: String,
					},
				},
			},
			air_time: {
				tradeAirtimeId: {
					type: mongoose.Schema.Types.Mixed,
					required: false,
					default: null,
				},
				amount: {
					type: Number,
					required: false,
					default: null,
				},
				installmentFlag: {
					type: String,
					required: false,
					default: null,
				},
				matAirtime: {
					type: mongoose.Schema.Types.Mixed,
					required: false,
					default: null,
				},
				description: {
					type: mongoose.Schema.Types.Mixed,
					required: false,
					default: null,
				},
				payAdvanceGroupId: {
					type: mongoose.Schema.Types.Mixed,
					required: false,
					default: null,
				},
				promotions: {
					type: Array,
					required: false,
					default: null,
				},
				payment: {
					type: Object,
					require: true,
					code: {
						type: String,
						required: false,
						default: null,
					},
				},
			},
			on_top_package: {
				type: Object,
			},
			order: {
				soId: {
					type: String,
					required: false,
					default: null,
				},
			},
			queue: {
				queueNo: {
					type: String,
					required: false,
					default: null,
				},
			},
			contract: {
				type: Object,
			},
			receipt: receiptSchema,
			status: {
				code: {
					type: String,
					required: false,
					default: null,
				},
				description: {
					type: String,
					required: false,
					default: null,
				},
			},
			quotaId: {
				type: Object,
			},
			main_promotion: {
				campaign: {
					campaignName: {
						type: String,
						required: false,
						default: null,
					},
					conditionCode: {
						type: String,
						required: false,
						default: null,
					},
					company: {
						type: String,
						required: false,
						default: null,
					},
					color: {
						type: String,
						required: false,
						default: null,
					},
					priceIncludeVat: {
						type: String,
						required: false,
						default: null,
					},
					discountIncludeVat: {
						type: String,
						required: false,
						default: null,
					},
					netPrice: {
						type: String,
						required: false,
						default: null,
					},
					contract: {
						type: String,
						required: false,
						default: null,
					},
					advancePay: {
						type: String,
						required: false,
						default: null,
					},
					installmentFlag: {
						type: Boolean,
						required: false,
						default: false,
					},
					summaryPrice: {
						type: String,
						required: false,
						default: null,
					},
					privilegeReturnCode: {
						type: String,
						required: false,
						default: null,
					},
				},
				trade: {
					normalPrice: {
						type: String,
						required: false,
						default: null,
					},
					tradeProductId: {
						type: String,
						required: false,
						default: null,
					},
					tradeNo: {
						type: String,
						required: false,
						default: null,
					},
					tradeName: {
						type: String,
						required: false,
						default: null,
					},
					packageKeyRef: {
						type: String,
						required: false,
						default: null,
					},
					packageOnTopKeyRef: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					minnimumPackagePrice: {
						type: String,
						required: false,
						default: null,
					},
					maximumPackagePrice: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					simLock: {
						type: String,
						required: false,
						default: null,
					},
					serviceLockHs: {
						type: String,
						required: false,
						default: null,
					},
					requireCheckQuota: {
						type: String,
						required: false,
						default: null,
					},
					requireChangePromotion: {
						type: Boolean,
						required: false,
						default: null,
					},
					minimumPriceLength: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					maximumPriceLength: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					maxReceiveFreeGoods: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					contractId: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					durationContract: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					limitContract: {
						type: mongoose.Schema.Types.Mixed,
						required: false,
						default: null,
					},
					discount: {
						tradeDiscountId: {
							type: String,
							required: false,
							default: null,
						},
						tradePriceExcludeVat: {
							type: String,
							required: false,
							default: null,
						},
						tradePriceInCludeVat: {
							type: String,
							required: false,
							default: null,
						},
						discountExcludeVat: {
							type: String,
							required: false,
							default: null,
						},
						discountExcludeBy: {
							type: String,
							required: false,
							default: null,
						},
						specialDiscountIncludeVat: {
							type: mongoose.Schema.Types.Mixed,
							required: false,
							default: null,
						},
						specialDiscountBy: {
							type: mongoose.Schema.Types.Mixed,
							required: false,
							default: null,
						},
						vatRate: {
							type: mongoose.Schema.Types.Mixed,
							required: false,
							default: null,
						},
						tradePrivilegeId: {
							type: mongoose.Schema.Types.Mixed,
							required: false,
							default: null,
						},
						installmentPartnerFlag: {
							type: mongoose.Schema.Types.Mixed,
							required: false,
							default: null,
						},
						startDate: {
							type: String,
							required: false,
							default: null,
						},
						endDate: {
							type: String,
							required: false,
							default: null,
						},
					},
					payAdvance: {
						payAdvanceGroupId: {
							type: mongoose.Schema.Types.Mixed,
							required: false,
							default: null,
						},
						priceIncludeVat: {
							type: String,
							required: false,
							default: null,
						},
						installmentFlag: {
							type: String,
							required: false,
							default: null,
						},
						matAirtime: {
							type: String,
							required: false,
							default: null,
						},
						description: {
							type: mongoose.Schema.Types.Mixed,
							required: false,
							default: null,
						},
					},
					freegoods: {
						type: Array,
					},
					privileges: {
						type: {
							type: Array,
						},
					},
					criterias: {
						type: {
							type: Array,
						},
					},
					discountPrice: {
						type: String,
						required: false,
						default: null,
					},
					orderType: {
						type: String,
						required: false,
						default: null,
					},
				},
			},
			payment: {
				paymentForm: {
					type: String,
					required: false,
					default: null,
				},
				paymentOnlineCredit: {
					type: Boolean,
					required: false,
					default: false,
				},
				paymentQrCodeType: {
					type: String,
					required: false,
					default: null,
				},
				paymentType: {
					type: String,
					required: false,
					default: null,
				},
				paymentBank: {
					name: {
						type: String,
						required: false,
						default: null,
					},
					abb: {
						type: String,
						required: false,
						default: null,
					},
					imageUrl: {
						type: String,
						required: false,
						default: null,
					},
				},
				paymentMethod: {
					type: String,
					required: false,
					default: null,
				},
				creditCardName: {
					type: String,
					required: false,
					default: null,
				},
				creditCardNo: {
					type: String,
					required: false,
					default: null,
				},
				installmentMonth: {
					type: String,
					required: false,
					default: null,
				},
				creditCardBank: {
					type: String,
					required: false,
					default: null,
				},
			},
			mpay_payment: {
				choiceOption: {
					type: String,
					required: false,
					default: null,
				},
			},
			device_care_payment: deviceCarePaymentSchema,
			seller: {
				locationCode: {
					type: String,
					required: false,
					default: null,
				},
				locationName: {
					type: String,
					required: false,
					default: null,
				},
				sellerName: {
					type: String,
					required: false,
					default: null,
				},
				ascCode: {
					type: String,
					required: false,
					default: null,
				},
				employeeId: {
					type: String,
					required: false,
					default: null,
				},
				soChannel: {
					type: String,
					required: false,
					default: null,
				},
			},
			preBooking: {
				preBookingNo: {
					type: String,
					required: false,
					default: null,
				},
				depositAmt: {
					type: String,
					required: false,
					default: null,
				},
				receiptNum: {
					type: String,
					required: false,
					default: null,
				},
			},
			provision: {
				services: {
					type: Array,
					priority: {
						type: String,
						default: null,
					},
					code: {
						type: String,
						default: null,
					},
					name: {
						type: String,
						default: null,
					},
					status: {
						code: {
							type: String,
							default: null,
						},
						description: {
							type: String,
							default: null,
						},
						error: {
							type: mongoose.Schema.Types.Mixed,
						},
						order: {
							type: Object,
						},
					},
					issue_date: {
						type: String,
						default: null,
					},
				},
			},
		},
		CREATE_BY: {
			type: String,
			required: false,
		},
		CREATE_DATE: {
			type: String,
			required: false,
			default: moment().format(),
		},
		LAST_UPDATE_BY: {
			type: Date,
			required: false,
		},
		LAST_UPDATE_DATE: {
			type: Date,
			required: false,
		},
	},
	{ versionKey: false },
).index({
	TRANSACTION_ID: 1,
	CREATE_BY: 1,
	LAST_UPDATE_BY: 1,
	LAST_UPDATE_DATE: 1,
	'DATA.customer.mainMobile': 1,
	'DATA.customer.status': 1,
});

const SimCardSchema = mongoose.model('sharedtransactionsSimcard', simCardSchema);
const SimCardModel = mongoose.model('sharedtransactionsSimcard');
const ShareTransactions = mongoose.model('sharedtransactions', shareTransactions);

export { ShareTransactions, SimCardSchema, SimCardModel };
