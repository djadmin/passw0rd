#!/usr/bin/env node
'use strict';

const Prompt = require('prompt-password');
const clipboardy = require('clipboardy');
const cowsay = require('cowsay');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const passw0rd = require('.');

const prompt = new Prompt({
	type: 'password',
	message: 'Enter your password please',
	name: 'pass'
});

let isCopied = false; // For clipboard checking

/**
 * Check clipboard if the given password was copied
 * @param {string} pass - The password to check
 */
const checkClipboard = pass => {
	return clipboardy.readSync() === pass;
};

/**
 * Clear clipboard util
 * @param {string} res - Result from the pwned password
 */
const clearClipboard = res => {
	if (!isCopied) {
		return;
	}
	console.log(`\n${logSymbols.info} clearing clipboard...`);
	// Appreciate :)
	clipboardy.writeSync(res.pwned ? '' : '😇  Thanks for using a strong password');
};

/**
 * Display information for the given password
 * @param {Object} res - The password to check
 * @param {Object} res - The password to check
 */
const showResult = res => {
	const messages = {
		pwned: `${logSymbols.error} Pwned ${chalk.yellow(res.count)} times!`,
		safe: `${logSymbols.success} Yay! No records found!`
	};
	console.log();
	if (res.pwned) {
		console.log(cowsay.think({text: messages.pwned, e: 'oO'}));
		// ShowWarning();
	} else {
		console.log(cowsay.say({text: messages.safe, f: 'tux'}));
	}
	return res;
};

const checkPass = pass => {
	if (!pass) {
		console.error(`${logSymbols.warning} Specify a password`);
		process.exit(1);
	}
	isCopied = checkClipboard(pass);
	return passw0rd.check(pass);
};

prompt.run()
	.then(checkPass)
	.then(showResult)
	.then(clearClipboard);
