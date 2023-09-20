import mongoose from 'mongoose';

const ConfigSaleChannal = new mongoose.Schema(
	{
		outChnSalesCode: String,
		Flow: String,
		subStockCodeDT: String,
		ScanIMEI: String,
		MOC: String,
	},
	{ versionKey: false },
);

const ConfigSaleChannalModel = mongoose.model<mongoose.Document>('config-sale-channals', ConfigSaleChannal);

export default ConfigSaleChannalModel;
