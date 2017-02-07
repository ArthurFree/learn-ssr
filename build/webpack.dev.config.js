const path = require('path');
const webpack = require('webpack');
const webpackBaseCfg = require('./webpack.config.base.js');
const help = require('./constants.js');

const rootPath = help.rootPath;

var _cfg = Object.assign({}, webpackBaseCfg, {
	debug: true,
	devtool: "source-map"
});

Object.getOwnPropertyNames(_cfg.entry).map(function (name) {
	_cfg.entry[name] = []
		.concat("webpack-hot-middleware/client")
		.concat(webpackBaseCfg.entry[name])
});

module.exports = _cfg;