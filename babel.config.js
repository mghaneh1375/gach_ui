module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-flow',
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    'react-require',
    [
      'module-resolver',
      {
        root: ['./src', './assets'],
        alias: {
          app: './src',
          assets: './assets',
        },
      },
    ],
    [
      'babel-plugin-require-context-polyfill',
      {
        alias: {
          app: './src',
        },
      },
    ],

    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',

    '@babel/plugin-transform-flow-strip-types',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: false,
      },
    ],

    ['@babel/plugin-transform-runtime', {}],
  ],
  sourceMaps: true,
};
