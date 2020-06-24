const path = require("path");

module.exports = {
	outputDir: path.resolve(__dirname, "../server/dist"),
	devServer: {
		port: 8081
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			'patterns': [
				path.resolve(__dirname, 'src/styles/global.scss'),
			]
		}
	}
}