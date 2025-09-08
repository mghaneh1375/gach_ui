const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@translator': path.resolve(__dirname, 'src/translator'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
  },
  configure: webpackConfig => {
    // Add .jsx to the list of resolved extensions
    webpackConfig.resolve.extensions = [
      '.jsx', // Prioritize .jsx files
      '.js',
      '.json',
      ...(webpackConfig.resolve.extensions || []),
    ];

    return webpackConfig;
  },
  configure: {
    resolve: {
      extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
    },
  },
};
