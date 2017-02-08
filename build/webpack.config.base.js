const path = require('path');
const webpack = require('webpack');
const help = require('./constants.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = help.rootPath;
const node_modules = path.resolve(__dirname, 'node_modules');

var entries = {};
help.pages.map((p) => { if (!!p.entry) entries[p.name] = p.entry; });

module.exports = {
	cache: true,
	entry: entries,
	output: {
		path: path.join(rootPath, "./dist/client/static"),
		filename: "[name].js",
		publicPath: "/static/"
	},
	resolve: {
		extensions: [".js", ".jsx", ".css", ".less"],
		alias: {
			utils: path.join(rootPath, "./client/utils")
		}
	},
	module: {
		// loaders: [
		// 	{
		// 		test: /.js?$/,
		// 		exclude: /node_modules/,
		// 		loader: 'babel-loader',
		// 		query: {
		// 			presets: ['es2015', 'react', 'stage-0']
		// 			// plugins: ['transform-runtime']
		// 		}
		// 	}
		// ]
		rules: [
			{
				test: /.js?$/,
				loader: "babel-loader",
				exclude: [
					node_modules
				],
				options: {
					presets: ['es2015', 'react', 'stage-0']
				}
			},
			// {
			// 	test: /.css?$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: "style-loader",
			// 		use: "css-loader"
			// 	})
			// }
		]
	},
	// plugins: [
	// 	new webpack.optimize.OccurrenceOrderPlugin(),
	// 	new webpack.HotModuleReplacementPlugin(),
	// 	new webpack.NoEmitOnErrorsPlugin()
	// ]
	plugins: []
}
