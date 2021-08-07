const path = require('path')

const resolve = (arg) => path.resolve(__dirname, arg)

module.exports = function () {
  return {
    babel: {
      presets: ['@emotion/babel-preset-css-prop'],
      plugins: ['@babel/plugin-proposal-nullish-coalescing-operator'],
    },
    webpack: {
      alias: {
        '@': resolve('src'),
      },
    },
    jest: {
      configure: {
        moduleNameMapper: {
          '^@/(.*)$': '<rootDir>/src/$1',
          '^lodash-es$': 'lodash',
        },
      },
    },
  }
}
