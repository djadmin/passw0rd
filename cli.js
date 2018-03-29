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

/**
 * Check & clear password from the clipboard if there is any
 * @param {string} pass - The password to check
 */
const clearClipboard = pass => {
	if (clipboardy.readSync() === pass) {
		console.log();
		console.log(`${logSymbols.info} clearing clipboard...`);
		clipboardy.writeSync('😇  Thanks for using a strong password️');
	}
};

/**
 * Display information for the given password
 * @param {Object} res - The password to check
 * @param {Object} res - The password to check
 */
const print = (res, pass) => {
	const messages = {
		pwned: `${logSymbols.error} Pwned ${chalk.yellow(res.count)} times!`,
		safe: `${logSymbols.success} Yay! No records found!`
	};

	console.log();
	if (res.pwned) {
		console.log(cowsay.think({text: messages.pwned, e: 'oO'}));
	} else {
		console.log(cowsay.say({text: messages.safe, f: 'tux'}));
	}
	clearClipboard(pass);
};

prompt.run().then(pass => {
	if (!pass) {
		console.error(`${logSymbols.warning} Specify a password`);
		process.exit(1);
	}
	passw0rd.check(pass)
		.then(res => print(res, pass));
});
