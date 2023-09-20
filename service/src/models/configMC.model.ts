import mongoose from 'mongoose';

type ConfigMenuType = {
	nameConfig: string;
	configFlow: {
		flowNameTh: string;
		flowNameEN: string;
		codeCPC: string;
		codeID: string;
		details: {
			outChnSalesCode: string[];
			transactionType: string;
		}[];
	}[];
};

type ConfigMenuPaymentType = {
	nameConfig: string;
	configFlow: ConfigFlow[];
};

type ConfigFlow = {
	method: string;
	cardType: string;
	methodName: string;
	methodNameTh: string;
};

const ConfigMenuDetail = new mongoose.Schema(
	{
		outChnSalesCode: [String],
		transactionType: String,
	},
	{ _id: false },
);

const ConfigMenuPaymentData = new mongoose.Schema(
	{
		method: String,
		cardType: String,
		methodName: String,
		methodNameTh: String,
	},
	{ _id: false },
);

const ConfigMenuData = new mongoose.Schema(
	{
		flowNameTh: String,
		flowNameEN: String,
		codeCPC: String,
		codeID: { type: String, index: true },
		details: [ConfigMenuDetail],
	},
	{ _id: false },
);

const ConfigMenu = new mongoose.Schema(
	{
		nameConfig: String,
		configFlow: mongoose.Schema.Types.Mixed,
		promotionName: Array,
		config: Array,

	},
	{ versionKey: false },
);

const ConfigMenuModel = mongoose.model<mongoose.Document>('configmcs', ConfigMenu);

export default ConfigMenuModel;
export type { ConfigMenuType, ConfigMenuPaymentType, ConfigFlow };
