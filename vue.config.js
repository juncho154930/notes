const path = require("path");

module.exports = {
	outputDir: path.resolve(__dirname, "../server/dist"),
	devServer: {
		port: 8081
	}
}