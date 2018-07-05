const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        path:  path.resolve('./dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        //这个插件可以确保.vue文件下的css和js可以按照规则编译
        new VueLoaderPlugin(),
        //添加我们的插件 会自动生成一个html文件
        //在dist目录下自动生成index.html
        new HtmlwebpackPlugin({
            //参考模板
            template: './dist/index.html',
        }),
        // 实现刷新浏览器必写
        new webpack.HotModuleReplacementPlugin(),
    ]
};