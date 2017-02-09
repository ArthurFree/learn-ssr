var path = require("path");
var rootPath = path.join(__dirname, "../");

var obj = {
	rootPath: rootPath,
	pages: [
		{
			name: "index",
			title: "hello, world",
			entry: path.join(rootPath, "./client/index.js"),
			output: path.join(rootPath)
		},
		{
			name: "login",
			title: "login",
			entry: path.join(rootPath, "./client/outside/js/login.js")
		}
	]
}

module.exports = obj;