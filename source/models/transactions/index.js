import DbModel from '../common/dbModel';
import ApplicationError from '../../../libs/applicationError';

/**
 * Create a new Transactions class
 */
class Transactions extends DbModel {
	/**
	 * Constructor
	 */
	constructor() {
		super('transaction');
	}

	/**
	 * Create new transaction
	 * @param {Object} transactionData
	 * @returns {Object}
	 */
	async create(transactionData) {
		const id = await this._generateId();
		const newTransaction = {...transactionData, id};

		await this._insert(newTransaction);

		return newTransaction;
	}

	/**
	 * Return all transactions for card
	 * @param {Number} cardId
	 * @returns {Object}
	 */
	async get(cardId) {
		const item = await this.getBy({cardId});

		return item;
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
