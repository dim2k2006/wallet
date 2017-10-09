import {validate, presence} from 'property-validator';
import luhn from '../../../libs/luhnCardValidation';
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
	 * Create new card
	 * @param {Object} card
	 * @returns {Object}
	 */
	async create(card) {
		const id = this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
		const newCard = {...card, id};

		const data = validate(newCard, [
			presence('cardNumber'),
			presence('balance'),
			luhn('cardNumber'),
		]);

		if (data.valid) {
			this._dataSource.push(newCard);
			await this._saveUpdates();
		} else {
			throw new ApplicationError('Card data is invalid', 400);
		}

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
		const data = validate(cardData, [
			presence('cardId'),
			presence('amount'),
		]);

		if (!data.valid) {
			throw new ApplicationError('Card data is invalid', 400);
		}

		const id = cardData.cardId;
		const amount = cardData.amount;
		const card = this._dataSource.find((item) => item.id === id);

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}

		const balance = Number(card.balance);
		const diff = balance - amount;

		const newBalance = diff > 0 ? diff : 0;

		card.balance = JSON.stringify(newBalance);

		await this._saveUpdates();
	}
}

export default Cards;
