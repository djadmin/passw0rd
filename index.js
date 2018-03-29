'use strict';
const sha1 = require('js-sha1');
const fetch = require('node-fetch');

/**
 * Search for a hash in a list of hashes separately
 * @param {string} body - A list of partially matches hashed
 * @param {string} hash - A hash to be matched
 * @returns {Object} returns { boolean, count }
 */
const search = (body, hash) => {
	const result = {pwned: false, count: 0};

	// Every password hash is followed by a colon (:) and the password count
	const pattern = new RegExp(hash + ':(\\d+)');
	const match = body.match(pattern);
	if (match) {
		result.pwned = true;
		result.count = match[1];
	}
	return result;
};

/**
 * Check if a password has appeared in any data breach
 * using hibp (https://haveibeenpwned.com/Passwords) API
 * @param {string} pass - The password to check
 * @returns {Promise<Object>} returns a promise with the result
 */
const checkPassword = pass => {
	const hash = sha1(pass).toUpperCase();
	const hashPrefix = hash.substring(0, 5);
	const hashSuffix = hash.substring(5);

	return fetch('https://api.pwnedpasswords.com/range/' + hashPrefix)
		.then(res => res.text())
		.then(body => search(body, hashSuffix))
		.catch(error => {
			console.log(error);
		});
};

module.exports = {
	check: checkPassword
};
