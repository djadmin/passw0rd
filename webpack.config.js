const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'passw0rd.js',
		library: 'passw0rd',
		libraryTarget: 'umd'
	},
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		})
	]
};
