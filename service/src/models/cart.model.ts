import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
	{
		customer: {
			type: Object,
			required: true,
		},
		body: {
			type: Object,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
);

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
