const checkPass = require('.');

checkPass.check('password')
	.then(z => console.log(z.pwned === true));
