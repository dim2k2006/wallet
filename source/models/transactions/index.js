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
		const data = validate(transactionData, [
			presence('cardId'),
			presence('type'),
			presence('data'),
			presence('time'),
			presence('sum'),
		]);

		if (data.valid) {
			transactionData.id = this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
			this._dataSource.push(transactionData);
			await this._saveUpdates();

			return transactionData;
		} else {
			throw new ApplicationError('Transaction data is invalid', 400);
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
