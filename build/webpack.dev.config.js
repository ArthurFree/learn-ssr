const path = require('path');
const webpack = require('webpack');
const webpackBaseCfg = require('./webpack.config.base.js');
const help = require('./constants.js');

const rootPath = help.rootPath;

module.exports = {
	context: path.resolve(__dirname, '../'),
	extry: {}
}