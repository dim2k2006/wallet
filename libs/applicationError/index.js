/**
 * Creates a new ApplicationError class
 */
class ApplicationError extends Error {
	/**
	 * Constructor
	 * @param {String} message
	 * @param {Number} status
	 */
	constructor(message, status) {
		super(message);
		this._status = status;
	}

	/**
	 * Return error status
	 * @returns {*}
	 */
	getStatus() {
		return this._status;
	}
}

export default ApplicationError;
