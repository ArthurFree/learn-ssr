var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./build/webpack.config.dev.js');


var app = express();
var compiler = webpack(config);

var multiPath = "./client/outside/";

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	inline: true,
	hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, "./index.html"));
});

app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname, multiPath, "./login.html"));
});

app.listen(5000);