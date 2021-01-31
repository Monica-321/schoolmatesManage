const { override, addWebpackAlias,fixBabelImports,addLessLoader } = require('customize-cra');
const path = require('path')

module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css' //或者true, true代表运用less
  }),
  addLessLoader({
    lessOptions: {
       javascriptEnabled: true,
       localIdentName: '[local]--[hash:base64:5]'
    }
  }),
)