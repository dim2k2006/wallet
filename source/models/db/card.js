import mongoose from 'mongoose';

const Card = mongoose.model('Card', {
	id: Number,
	cardNumber: String,
	balance: Number
});

export default Card;
