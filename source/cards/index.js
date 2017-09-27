import storage from '../storage';
import isValid from '../../libs/luhnCardValidation';

/**
 * Create a new Cards class
 */
class Cards {
	/**
	 * Constructor
	 */
	constructor() {
		this.getCards = this.getCards.bind(this);
		this.addCards = this.addCards.bind(this);
		this.deleteCards = this.deleteCards.bind(this);

		return {
			get: this.getCards,
			add: this.addCards,
			del: this.deleteCards,
		};
	}

	/**
	 * Get all cards from storage
	 * @param {Object} req
	 * @param {Object} res
	 */
	getCards(req, res) {
		storage.get()
			.then((response) => {
				res.header('Content-Type', 'application/json');
				res.status(200);
				res.send(response);
			})
			.catch(() => {
				res.status(503);
				res.send('Can not get cards from storage');
			});
	}

	/**
	 * Add card to storage
	 */
	addCards(req, res) {
		const cardNumber = req.body.cardNumber || 0;
		const balance = req.body.balance ? parseFloat(req.body.balance) : 0;

		if (!isValid(cardNumber)) {
			res.status(400);
			res.end('Invalid card number');

			return false;
		}

		storage.add({cardNumber, balance})
			.then((response) => {
				res.header('Content-Type', 'application/json');
				res.status(200);
				res.send(response);
			})
			.catch(() => {
				res.status(500);
				res.end('Server error');
			});
	}

	/**
	 * Delete card from storage
	 */
	deleteCards(req, res) {
		const id = req.param.id;

		console.log(id);

		res.end('delete');
	}
}

export default new Cards();
