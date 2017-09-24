import fs from 'fs';

/**
 * Create a new class Cards
 */
class Cards {
	/**
	 * Constructor
	 */
	constructor() {
		this.getCards = this.getCards.bind(this);
		this.addCards = this.addCards.bind(this);
		this.deleteCards = this.deleteCards.bind(this);
		this.storage = __dirname + '/cards.json';

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
		fs.readFile(this.storage, 'utf8', (error, data) => {
			if (error) {
				console.log(error);

				res.status(503);
				res.send('Can not get cards from storage');
			}

			res.header('Content-Type', 'application/json');
			res.status(200);
			res.send(data);
		});
	}

	/**
	 * Add card to storage
	 */
	addCards() {
		//
	}

	/**
	 * Delete card from storage
	 */
	deleteCards() {
		//
	}
}

export default new Cards();
