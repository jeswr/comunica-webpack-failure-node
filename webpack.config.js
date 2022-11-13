const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// First check if we can load Comunica form cwd, if not, fallback to the default
let pathToComunica;
let comunicaOverride;
try {
  pathToComunica = require.resolve('@comunica/query-sparql', { paths: [process.cwd()] });
  comunicaOverride = true;
}
catch {
  pathToComunica = require.resolve('@comunica/query-sparql', { paths: [__dirname] });
  comunicaOverride = false;
}

module.exports = [
  {
    target: "node",
    entry: [
      path.join(__dirname, './src/main.js'),
    ],
    output: {
      filename: 'main.min.js',
      path: path.join(__dirname, '/build'),
      libraryTarget: 'commonjs2', // Fixes hot loading of web worker not working in Webpack
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        }
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new NodePolyfillPlugin({
        includeAliases: ['Buffer'], // Buffer global is still needed due to the jsonparser library
      }),
      new webpack.NormalModuleReplacementPlugin(/^my-comunica-engine$/, path.join(process.cwd(), '.tmp-comunica-engine.js')),
      ...comunicaOverride ? [] : [
        new webpack.NormalModuleReplacementPlugin(/^\@comunica/, (resource) => {
          resource.context = __dirname;
        }),
      ],
    ],
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
    },
  },
];