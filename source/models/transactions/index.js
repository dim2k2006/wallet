import {validate, presence} from 'property-validator';
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
		const id = this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
		const newTransaction = {...transactionData, id};

		this._dataSource.push(newTransaction);
		await this._saveUpdates();

		return newTransaction;
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
	// eslint-disable-next-line class-methods-use-this
	async remove() {
		throw new ApplicationError('Transactions removal is forbidden', 403);
	}
}

export default Transactions;
