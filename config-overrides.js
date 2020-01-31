const { override, addBabelPlugins } = require('customize-cra')

module.exports = override(
  ...addBabelPlugins(
    [
      'module-resolver',
      {
        alias: {
          components: './src/components/',
          assets: './src/assets',
          utils: './src/utils',
          actions: './src/actions',
          reducers: './src/reducers',
          context: './src/context',
        },
      },
    ],
    ['babel-plugin-styled-components', { fileName: false }]
  ),
  config => {
    // Need to disable optimizer so testcafe ReactSelector can work
    if (process.env.REACT_APP_BUILD && process.env.REACT_APP_BUILD === 'CI')
      config.optimization.minimizer = []
    return config
  }
  // jest: function(config) {
  //   config.setupTestFrameworkScriptFile = '<rootDir>/__tests__/config/setupTests.js'
  //   config.testMatch = [
  //     '**/__tests__/unit/**/*.(spec|test).js',
  //   ]
  //   return config
  // },
)
