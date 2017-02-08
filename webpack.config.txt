var path = require('path');
var webpack = require('webpack');
var rootPath = path.resolve(__dirname);
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
	cache: true,
	entry: {
		"index": [
			"webpack-hot-middleware/client",
			"./views/index.js"
		],
		vendor: [
			'react',
			'react-dom',
		]
	},
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
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.HotModuleReplacementPlugin()
	]
}