import fs from 'fs';

/**
 * Create a new Storage class
 */
class Storage {
	/**
	 * Constructor
	 */
	constructor() {
		this.getData = this.getData.bind(this);
		this.addData = this.addData.bind(this);
		this.path = __dirname + '/cards.json';

		return {
			get: this.getData,
			add: this.addData,
			del: this.deleteData,
		};
	}

	/**
	 * Get data from storage
	 * @return {Promise}
	 */
	getData() {
		return new Promise((resolve, reject) => {
			fs.readFile(this.path, 'utf8', (error, data) => {
				if (error) {
					console.log(`Can not read data from storage, error info: ${error}`);

					reject();
				}

				resolve(data);
			});
		});
	}

	/**
	 * Add data to storage
	 * @param {Object} data
	 * @returns {Promise}
	 */
	addData(data) {
		return new Promise((resolve, reject) => {
			this.getData()
				.then((response) => {
					const responseData = JSON.parse(response);
					const card = responseData.find((card) => card.cardNumber === data.cardNumber);
					const result = {cardNumber: '', balance: ''};

					if (card) {
						card.balance = data.balance;

						result.cardNumber = card.cardNumber;
						result.balance = card.balance;
					} else {
						responseData.push(data);

						result.cardNumber = data.cardNumber;
						result.balance = data.balance;
					}

					fs.writeFile(this.path, JSON.stringify(responseData), 'utf8', (error) => {
						if (error) {
							console.log(`Can not write data to storage, error info: ${error}`);

							reject();
						}

						resolve(result);
					});

					resolve(result);
				})
				.catch((error) => {
					console.log(`Can not get data from storage, error info: ${error}`);
				});
		});
	}

	/**
	 * Delete data from storage
	 * @param {String} id
	 */
	deleteData(id) {
		return new Promise((resolve, reject) => {
			this.getData()
				.then((response) => {
					const responseData = JSON.parse(response);

					// delete card
				})
				.catch((error) => {
					console.log(`Can not get data from storage, error info: ${error}`);
				});
		});
	}
}

export default new Storage();
