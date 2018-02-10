var path = require('path');
var webpack = require('webpack');
var config = {
   //devtool: 'hidden-source-map',
   entry: [path.join(__dirname,'./client/src/index.js')],
   output: {
    path: path.join(__dirname,'./client/public'),
    filename: 'bundle.js',
 },

 devServer: {
    inline: true,
    port: 8080
 },
 
 module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,query: {
        compact: false,
        presets: ['es2015']
      } },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
      test: /\.css$/,
      loader: [ 'style-loader', 'css-loader' ]
       },
      {
      test: /\.less$/,
      loader: [ 'style-loader', 'css-loader' ]
      },

    ]
 },
 plugins: [
  new webpack.optimize.UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true
  })
]
}

module.exports = config;