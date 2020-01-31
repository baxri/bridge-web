module.exports = {
  presets: ['react-app'],
  plugins: [
    'macros',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          components: './src/components',
          assets: './src/assets/',
          utils: './src/utils/',
          actions: './src/actions',
          reducers: './src/reducers',
          context: './src/context',
        },
      },
    ],
  ],
}
