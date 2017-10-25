import DbModel from '../common/dbModel';
import ApplicationError from '../../../libs/applicationError';

/**
 * Create a new Cards class
 */
class Cards extends DbModel {
	/**
	 * Constructor
	 */
	constructor() {
		super('card');
	}

	/**
	 * Get card
	 * @param {Number} id
	 * @returns {Promise.<T|*|{}>}
	 */
	async get(id) {
		return this._dataSource.find((item) => item.id === Number(id));
	}

	/**
	 * Create new card. If new card already exist - update card balance
	 * @param {Object} card
	 * @returns {Object}
	 */
	async create(card) {
		const id = await this._generateId();
		let newCard = {};

		const existingCard = this._dataSource.find((item) => item.cardNumber === card.cardNumber);

		if (!existingCard) {
			newCard = {...card, id};
		} else {
			existingCard.balance = card.balance;
			newCard = existingCard;
		}

		await this._insert(newCard);

		return newCard;
	}

	/**
	 * Remove card
	 * @param {Number} id
	 */
	async remove(id) {
		const card = await this.get(id);

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}

		await this._remove(id);
	}

	/**
	 * Reduce card balance
	 * @param {Object} cardData
	 * @returns {Promise.<void>}
	 */
	async reduce(cardData) {
		const id = cardData.cardId;
		const amount = cardData.amount;
		const card = await this.get(id);

		const newBalance = Number(card.balance) - Number(amount);

		await this._update({id}, {balance: newBalance});
	}

	/**
	 * Increase card balance
	 * @param {Object} cardData
	 * @returns {Promise.<void>}
	 */
	async increase(cardData) {
		const id = cardData.cardId;
		const amount = cardData.amount;
		const card = await this.get(id);

		const newBalance = Number(card.balance) + Number(amount);

		await this._update({id}, {balance: newBalance});
	}
}

export default Cards;
