const { environment } = require('@rails/webpacker')

// Bootstrap 3 has a dependency over jQuery:
const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    "window.jQuery": "jquery"
  })
)

// const babelLoader = environment.loaders.get('babel')
// babelLoader.options.cacheDirectory = false

module.exports = environment
