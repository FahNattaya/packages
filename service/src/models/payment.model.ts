import mongoose from 'mongoose';

export interface IPaymentSelected {
	paymentMethod: string;
	method: string;
	paymentType: string;
	bankAbbr: string;
	installmentId: number;
	installmentRate: string;
	installmentTerms: number;
	balloonMonth: number;
}

const LoanAddressSchema = new mongoose.Schema(
	{
		TUMBOL: String,
		AMPHUR: String,
		PROVINCE: String,
		ZIPCODE: String,
	},
	{ collection: 'loanAddress', versionKey: false },
);

const LoanAddressModel = mongoose.model('loanAddress', LoanAddressSchema);

export { LoanAddressModel };
