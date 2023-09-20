import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
	{
		locationCode: {
			type: String,
			required: true,
		},
		locationName: {
			type: String,
			required: true,
		},
		company: {
			type: String,
			required: true,
		},
		subStockCode: {
			type: String,
			required: true,
		},
		productType: {
			type: String,
			required: true,
		},
		productSubType: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		stockAval: {
			type: String,
			required: true,
		},
		productName: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
);
const StockModel = mongoose.model('Stock', cartSchema);

export default StockModel;
