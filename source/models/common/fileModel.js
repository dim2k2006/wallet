import fs from 'fs';
import path from 'path';
import Model from './model';

/**
 * Create a new FileModel class
 */
class FileModel extends Model {
	/**
	 * Constructor
	 * @param {String} sourceFileName
	 */
	constructor(sourceFileName) {
		super();
		this._dataSourceFile = path.join(__dirname, '..', '..', 'data', sourceFileName);
		this._dataSource = null;
	}

	/**
	 * Load source file
	 * @returns {Promise.<null|*>}
	 */
	async loadFile() {
		if (!this._dataSource) {
			await new Promise((resolve, reject) => {
				fs.readFile(this._dataSourceFile, (fileError, data) => {
					if (fileError) {
						return reject(fileError);
					}

					try {
						this._dataSource = JSON.parse(data);

						return resolve();
					} catch (error) {
						return reject(error);
					}
				});
			});
		}

		return this._dataSource;
	}

	/**
	 * Return all items
	 * @returns {Promise.<null|*>}
	 */
	async getAll() {
		return this.loadFile();
	}

	/**
	 * Generate new id
	 * @return {Number}
	 * @private
	 */
	_generateId() {
		return this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
	}

	/**
	 * Save updates
	 * @private
	 */
	async _saveUpdates() {
		return new Promise((resolve) =>
			fs.writeFile(this._dataSourceFile, JSON.stringify(this._dataSource, null, 4), resolve));
	}
}

export default FileModel;
