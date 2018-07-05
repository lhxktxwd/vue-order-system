const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, './src/main');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    mode: 'development',
    //实现刷新浏览器webpack-hot-middleware/client 是必填的
    entry: ["webpack-hot-middleware/client", APP_PATH],
    output: {
        path: BUILD_PATH,
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
    resolve: {
        //当开发环境时需要经过预编译vue文件中tepmlate所以用预编译和运行时的版本
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
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