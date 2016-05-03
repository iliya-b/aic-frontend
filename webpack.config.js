const path = require('path');
// const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
	devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
	context: path.join(__dirname, './src/app'),
	entry: './app.jsx',
	// entry: {
		// js: './app.jsx',
		// vendor: ['react']
	// },
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
					// 'react-hot',
					'babel-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	}//,
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: 'vendor',
	// 		minChunks: Infinity,
	// 		filename: 'vendor.bundle.js'
	// 	}),
	// 	new webpack.LoaderOptionsPlugin({
	// 		minimize: true,
	// 		debug: false
	// 	}),
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		compress: {
	// 			warnings: false
	// 		},
	// 		output: {
	// 			comments: false
	// 		},
	// 		sourceMap: false
	// 	}),
	// 	new webpack.DefinePlugin({
	// 		'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
	// 	})
	// ],
	// devServer: {
	// 	contentBase: './client'
	// 	// hot: true
	// }
};
