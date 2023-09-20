import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
	ID: String,
	SEQUENCE_VALUE: Number,
	__v: { type: Number, select: false },
});
counterSchema.index({
	ID: 'text',
});

const queueSchema = new mongoose.Schema({
	LOCATION_CODE: String,
	QUEUE: String,
	__v: { type: Number, select: false },
});
queueSchema.index({
	LOCATION_CODE: 'text',
});

const counterModel = mongoose.model('Counter', counterSchema);
const queueModel = mongoose.model('Queue', queueSchema);
export { counterModel, queueModel };
