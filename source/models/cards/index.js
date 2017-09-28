import fs from 'fs';
import path from 'path';
import ApplicationError from '../../../libs/applicationError';

const dataSource = path.join(__dirname, 'cards.json');

/**
 * Create a new Cards class
 */
class Cards {
	/**
	 * Constructor
	 */
	constructor(sourceFileName) {
		this._getAll = this._getAll.bind(this);
		this._add = this._add.bind(this);
		this._delete = this._delete.bind(this);
		this._data = require(sourceFileName);

		return {
			get: this._getAll,
			add: this._add,
			del: this._delete,
		};
	}

	/**
	 * Get all cards
	 * @returns {Array}
	 * @private
	 */
	async _getAll() {
		return this._data;
	}

	/**
	 * Add card
	 * @param {Object} card
	 * @returns {Object}
	 * @private
	 */
	async _add(card) {
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
	 * Delete card
	 * @private
	 */
	async _delete(id) {
		const card = this._data.find((item) => item.id === id);

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}

		const cardIndex = this._data.indexOf(card);

		this._data.splice(cardIndex, 1);
		await this._saveUpdates();
	}

	/**
	 * Save updates
	 * @private
	 */
	_saveUpdates() {
		return new Promise(resolve => fs.writeFile(dataSource, JSON.stringify(this._data, null, 4), resolve));
	}
}

export default new Cards(dataSource);
