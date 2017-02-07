var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');


var app = express();
var compiler = webpack(config);

app.ues(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	inline: true,
	hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));