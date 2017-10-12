/**
 * Check if property is not empty
 * @param {String} propertyName
 * @returns {Function}
 */
const isEmpty = (propertyName) => {
	return (subject) => {
		const value = subject[propertyName];

		return value.length > 0;
	};
};

/**
 * Validate card number with Luhn algorithm (4556253936368724 - valid card number for test)
 * @param {String} propertyName
 * @returns {Function}
 */
const isLuhn = (propertyName) => {
	return (subject) => {
		let value = subject[propertyName];
		const result = {
			result: true,
			message: value + " is invalid card number",
			field: propertyName,
		};

		// accept only digits, dashes or spaces
		if (/[^0-9-\s]+/.test(value)) {
			result.result = false;

			return result;
		}

		// The Luhn Algorithm. It's so pretty.
		let nCheck = 0;
		let bEven = false;

		value = value.replace(/\D/g, "");

		for (let n = value.length - 1; n >= 0; n--) {
			let cDigit = value.charAt(n);
			let nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) {
					nDigit -= 9;
				}
			}

			nCheck += nDigit;
			bEven = !bEven;
		}

		result.result = (nCheck % 10) === 0;

		return result;
	};
};

export {isEmpty, isLuhn};
