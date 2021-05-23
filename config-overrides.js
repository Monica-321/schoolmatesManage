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
    // style: 'css' //或者true, true代表运用less
    style: true,
  }),
  addLessLoader({
    lessOptions: {
       javascriptEnabled: true,
       localIdentName: '[local]--[hash:base64:5]',
       modifyVars: { 
         "@primary-color": "#3370a7", //主题色  校徽蓝#004d91 明度高一点的
         "@layout-header-background": "#fff", //header背景色
         "@menu-dark-bg": "#0a253e",  //menu在dark模式下的背景色 原来#333645
         "@menu-item-height": "50px", //菜单项高度
         "@item-hover-bg":"#e4e6e5", 
        }
    }
  }),
)