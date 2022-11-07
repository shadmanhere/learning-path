/* eslint-disable  react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useBabelRc, override, addWebpackModuleRule } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(js|tsx)$/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: '@linaria/webpack-loader',
        options: {
          cacheDirectory: 'src/.linaria_cache',
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
    ],
  }),
)
