var path = require('path');
var webpack = require('webpack');
var help = require('./constants.js');

var rootPath = help.rootPath;

var entries = {};
help.pages.map((p) => { if (!!p.entry) entries[p.name] = p.entry; });

module.exports = {
	cache: true,
	entry: entries,
	output: {
		path: path.join(rootPath, "./dist/static"),
		filename: "[name].js",
		publicPath: "/static/"
	},
	resolve: {
		extensions: ["", ".js", ".jsx", ".css", ".less"],
		alias: {
			utils: path.join(rootPath, "./client/utils")
		}
	},
	module: {
		loaders: [
			{
				test: /.js?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react', 'stage-0']
					// plugins: ['transform-runtime']
				}
			}
		]
	}
}
