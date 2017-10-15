import FileModel from '../common/fileModel';
import ApplicationError from '../../../libs/applicationError';

/**
 * Create a new Cards class
 */
class Cards extends FileModel {
	/**
	 * Constructor
	 */
	constructor() {
		super('cards.json');
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
		const id = this._generateId();
		let newCard = {};

		const existingCard = this._dataSource.find((item) => item.cardNumber === card.cardNumber);

		if (!existingCard) {
			newCard = {...card, id};
			this._dataSource.push(newCard);
		} else {
			existingCard.balance = card.balance;
			newCard = existingCard;
		}

		await this._saveUpdates();

		return newCard;
	}

	/**
	 * Remove card
	 * @param {Number} id
	 */
	async remove(id) {
		const card = this._dataSource.find((item) => item.id === id);

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}

		const cardIndex = this._dataSource.indexOf(card);

		this._dataSource.splice(cardIndex, 1);
		await this._saveUpdates();
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

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}

		const balance = card.balance;
		const diff = balance - amount;

		const newBalance = diff > 0 ? diff : 0;

		card.balance = newBalance;

		await this._saveUpdates();
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

		card.balance = Number(card.balance) + Number(amount);

		await this._saveUpdates();
	}
}

export default Cards;
