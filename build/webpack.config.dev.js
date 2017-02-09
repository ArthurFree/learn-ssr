const path = require('path');
const webpack = require('webpack');
const webpackBaseCfg = require('./webpack.config.base.js');
const help = require('./constants.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
	.concat(getHtmlChunk())
	.concat([
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("dev")
			}
		}),
		new ExtractTextPlugin({
			filename: "[name].css",
			disable: false,
			allChunk: true
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "common",
			filename: "common.js",
			minChunks: 2
		})
	])

function getHtmlChunk() {
	var basePath = "./client/outside";
	return help.pages.map(function (p) {
		if (p.name === "index") {
			return new HtmlWebpackPlugin({
				title: p.title,
				name: "p_" + p.name,
				template: path.join(rootPath, basePath, "./tmpl/index.html"),
				filename: path.join(rootPath, "index.html"),
				inject: true,
				favicon: false,
				chunks: ['index', 'common']
			})
		} else {
			return new HtmlWebpackPlugin({
				title: p.title,
				name: "p_" + p.name,
				template: path.join(rootPath, basePath, "./tmpl/basic.html"),
				filename: path.join(rootPath, basePath, p.name + ".html"),
				inject: true,
				favicon: false,
				chunks: ['login', 'common']
			})
		}
	})
}

module.exports = _cfg;