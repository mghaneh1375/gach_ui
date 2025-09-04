module.exports = {
  plugins: ['unused-imports'],
  root: true,
  extends: '@react-native-community',
  parser: '@babel/eslint-parser',
  rules: {
    curly: 'off',
    'react/style-prop-object': 'off',
    'react-native/no-inline-styles': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'prefer-const': 'error',
    'react/jsx-filename-extension': ['error', {extensions: ['.jsx']}],
  },
};
