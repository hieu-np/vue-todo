// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    proxy:{
      '^/api': {
        target: 'https://62947bc3a7203b3ed069dbdd.mockapi.io',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/api': '/'}
      }
    }
  }
}
