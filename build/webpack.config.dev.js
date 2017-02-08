const path = require('path');
const webpack = require('webpack');
const webpackBaseCfg = require('./webpack.config.base.js');
const help = require('./constants.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = help.rootPath;

var _cfg = Object.assign({}, webpackBaseCfg, {
	// debug: true,
	devtool: "source-map"
});

Object.getOwnPropertyNames(_cfg.entry).map(function (name) {
	_cfg.entry[name] = []
		.concat("webpack-hot-middleware/client?reload=true")
		.concat(webpackBaseCfg.entry[name])
});

_cfg.plugins = webpackBaseCfg.plugins
	.concat([
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("dev")
			}
		}),
		// new ExtractTextPlugin("[name].css", {
		// 	disable: false,
		// 	allChunk: true
		// })
	])

module.exports = _cfg;