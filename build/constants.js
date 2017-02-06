var path = require("path");
var rootPath = path.join(__dirname, "../");

var obj = {
	pages: [
		{
			name: "index",
			title: "hello, world",
			entry: "index",
			output: path.join(rootPath)
		}
	]
}

module.exports = obj;