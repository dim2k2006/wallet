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
		this.path = __dirname + '/cards.json';

		return {
			get: this.getData,
		};
	}

	/**
	 * Get data from storage
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
}

export default new Storage();
