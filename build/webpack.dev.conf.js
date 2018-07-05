const path = require('path');
const merge = require('webpack-merge')
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig,{
    mode: 'development',
    //实现刷新浏览器webpack-hot-middleware/client 是必填的
    entry: ["webpack-hot-middleware/client", path.resolve('./src/main')],
    resolve: {
        //当开发环境时需要经过预编译vue文件中tepmlate所以用预编译和运行时的版本
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
})

module.exports = devWebpackConfig;