/*eslint-disable no-empty-function, no-unused-vars*/
/**
 * Create a new Model class
 */
class Model {
	/**
	 * Return list of all items
	 * @returns {Promise.<void>}
	 */
	async getAll() {}

	/**
	 * Return one item
	 * @param {Number} id
	 * @returns {Promise.<void>}
	 */
	async get(id) {}

	/**
	 * Create new item
	 * @returns {Promise.<void>}
	 */
	async create() {}

	/**
	 * Remove item
	 * @param {Number} id
	 * @returns {Promise.<void>}
	 */
	async remove(id) {}
}

export default Model;
/*eslint-enable no-empty-function, no-unused-vars*/
