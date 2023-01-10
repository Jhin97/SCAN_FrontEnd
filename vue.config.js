const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:"8888",
    host:"localhost",
    https:false,
    open:true,
    // productionSourceMap: false,
    // proxy:{
    //   '^/api':{
    //     target: 'http://localhost:8080/',
    //     changeOrigin:true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  publicPath:"./",
  outputDir:"dist",
  lintOnSave:false
})
