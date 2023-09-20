import mongoose from 'mongoose';

// interface IConfigFlow extends Document {
//     MC: string;
//     repo: string;
//     node: string;
//     apiNo: string;
//     errorCode: string;
// }

// interface IErrorApi extends Document {
//     nameConfig: string;
//     configFlow: IConfigFlow[];
// }

const configFlowSchema = new mongoose.Schema(
	{
		MC: String,
		repo: String,
		node: String,
		apiNo: String,
		errorCode: String,
	},
	{ _id: false },
);

const errorApiSchema = new mongoose.Schema(
	{
		nameConfig: String,
		configFlow: [configFlowSchema],
	},
	{ versionKey: false },
);

const ErrorApi = mongoose.model<mongoose.Document>('errormcs', errorApiSchema);

export default ErrorApi;
