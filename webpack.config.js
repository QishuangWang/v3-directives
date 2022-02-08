const path = require('path') // 路径处理模块
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 引入CleanWebpackPlugin插件


module.exports = {
  entry: {
    index: path.join(__dirname, '/src/main.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'), 
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new CleanWebpackPlugin() // 所要清理的文件夹名称
  ]
}