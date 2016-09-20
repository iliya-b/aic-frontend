const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

// Always on plugins
const pluginList = [
	new webpack.DefinePlugin({
		'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
	})
];

// Plugins only for production
if (isProd) {
	pluginList.push(new webpack.optimize.UglifyJsPlugin());
	pluginList.push(new webpack.optimize.DedupePlugin());
}

module.exports = {
	devtool: isProd ? false : 'cheap-eval-source-map',
	context: path.join(__dirname, './src/app'),
	entry: './app.jsx',
	output: {
		path: path.join(__dirname, './build'),
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: [
					'babel-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: path.resolve(__dirname, './src/app/')
		}
	},
	plugins: pluginList
};
