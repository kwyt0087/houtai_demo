// 遵循的是 webpack.config.js 的规范，也就是 CommonJS
module.exports = {
  devServer: {
    open: true,
    port: 9527
    // 解决跨域的一种写法
    // proxy: {
    //   '/api': {
    //     target: 'https://www.xxx.com', // 目标路径，别忘了加http和端口号
    //     changeOrigin: true, // 是否跨域
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': '' // 重写路径
    //     }
    //   }
    // }
  }
}
