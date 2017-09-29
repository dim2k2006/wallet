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
	 * @private
	 */
	async create(card) {
		const isDataValid = card && card.hasOwnProperty('cardNumber') && card.hasOwnProperty('balance');

		if (isDataValid) {
			card.id = this._data.reduce((max, item) => Math.max(max, item.id), 0) + 1;
			this._data.push(card);
			await this._saveUpdates();

			return card;
		} else {
			throw new ApplicationError('Card data is invalid', 400);
		}
	}

	/**
	 * Remove card
	 * @private
	 */
	async remove(id) {
		const card = this._data.find((item) => item.id === id);

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}

		const cardIndex = this._data.indexOf(card);

		this._data.splice(cardIndex, 1);
		await this._saveUpdates();
	}
}

export default new Cards;
