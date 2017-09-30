import { validate, presence } from 'property-validator';
import FileModel from '../common/fileModel';
import ApplicationError from '../../../libs/applicationError';

/**
 * Create a new Transactions class
 */
class Transactions extends FileModel {
	/**
	 * Constructor
	 */
	constructor() {
		super('transactions.json');
	}

	/**
	 * Create new transaction
	 * @param {Object} transactionData
	 * @returns {Object}
	 */
	async create(transactionData) {
		const isDataValid = validate(transactionData, [
			presence('id'),
			presence('cardId'),
			presence('type'),
			presence('data'),
			presence('time'),
			presence('sum'),
		]);

		console.log(isDataValid);

		if (isDataValid) {
			transactionData.id = this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
			this._dataSource.push(transactionData);
			await this._saveUpdates();

			return transactionData;
		} else {
			throw new ApplicationError('Card data is invalid', 400);
		}
	}

	/**
	 * Return all transactions for card
	 * @param {Number} cardId
	 * @returns {Object}
	 */
	async get(cardId) {
		const sourceData = await this.getAll();
		const data = sourceData.filter((item) => item.cardId === cardId);

		return data;
	}

	/**
	 * Remove transaction
	 */
	async remove() {
		throw new ApplicationError('Transactions removal is forbidden', 403);
	}
}

export default Transactions;
