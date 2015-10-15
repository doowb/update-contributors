import {readdirSync as read} from 'fs';
import {join} from 'path';
import webpack from 'webpack';

const nodeModules = read(join(process.cwd(), 'node_modules')).reduce((o, mod) => {
  if (mod !== '.bin') {
    o[mod] = `commonjs ${mod}`;
  }
  return o;
}, {});

const loaders = [
  {
    test: /\.js?$/,
    exclude: /node_modules/,
    loader: 'babel?optional[]=runtime&stage=0'
  },
  {
    test: /\.json?$/,
    loader: 'json'
  }
];

const plugins = [
  new webpack.BannerPlugin(
    'try{require("source-map-support").install();}\ncatch(err) {}',
    { raw: true, entryOnly: false }
  )
];

const entry = {
  index: './index.js'
};

module.exports =  {
  entry: entry,
  output: {
    path: join(__dirname, 'dist'),
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: loaders
  },
  plugins: plugins,
  target: 'node',
  devtool: 'sourcemap',
  externals: nodeModules
};
