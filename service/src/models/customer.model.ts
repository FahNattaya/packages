import * as mongoose from 'mongoose';
import { CustomerProfile } from '../interfaces/customer.interface';

const CustomerProfileSchema = new mongoose.Schema(
	{
		title: String,
		name: String,
		mobileNo: String,
		mobileSegment: String,
		mobileStatus: String,
		chargeType: String,
		customerType: String,
		preferredLanguage: String,
		birthDate: String,
	},
	{ versionKey: false },
);

const CustomerModel = mongoose.model<CustomerProfile & mongoose.Document>('CustomerProfile', CustomerProfileSchema);

export default CustomerModel;
