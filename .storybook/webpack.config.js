const path = require('path');

module.exports = {
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			app: path.resolve(__dirname, '../src/app/'),
			stories: path.resolve(__dirname, '../stories/'),
			build: path.resolve(__dirname, '../build/'),
			test: path.resolve(__dirname, '../test/')
		}
	},
	module: {
		loaders: [
			{
				test: /\.css?$/,
				loaders: ['style', 'raw'],
				include: /build/
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file?name=../build/fonts/[name].[ext]'
			}
		]
	}
};
