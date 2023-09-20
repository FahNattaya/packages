import mongoose from 'mongoose';

const whiteListLocationSchema = new mongoose.Schema(
	{
		locationCode: {
			type: String,
			required: true,
		},
		startDate: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		shopType: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
);
const WhiteListLocationModel = mongoose.model('whitelistlocation', whiteListLocationSchema, 'whitelistlocation');

export default WhiteListLocationModel;
