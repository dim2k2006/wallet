import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Transaction = mongoose.model('Transaction', {
	cardId: Number,
	type: String,
	data: Schema.Types.Mixed,
	time: {type: Date, default: Date.now},
	sum: String,
	id: Number
});

export default Transaction;
