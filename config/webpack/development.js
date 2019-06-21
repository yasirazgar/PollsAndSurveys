process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnv(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}

module.exports = environment.toWebpackConfig()
