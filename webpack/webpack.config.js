const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevelop = (argv.mode === 'development');

  return {
    entry: [
      './src/js/main.js'
    ],
    output: {
      path: path.resolve(__dirname, '../hugo/assets'),
      filename: '[name].js',
      assetModuleFilename: (pathData, _) => path.relative('src/img', pathData.filename)
    },
    devtool: (isDevelop ? 'inline-source-map' : false),
    plugins: [
      new MiniCssExtractPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /\/node_modules\//,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env'
                ]
              }
            }
          ]
        },
        {
          test: /\.scss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-preset-env'
                  ]
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(ico|jpe?g|png|gif|svg)$/i,
          type: 'asset/resource'
        }
      ]
    }
  };
};
