var webpack = require('webpack')
var path = require('path')
// 导入一些webpack不是默认自带的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry: {
        index:path.join(__dirname, "js/app/index.js"),
        login:path.join(__dirname,"js/app/login.js")
    },
    output: {
        path: path.join(__dirname, "../public"),
        filename: "js/[name].js"
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader", "postcss-loader"]
                }) //把 css 抽离出来生成一个文件
        }]
    },
    resolve: {
        //起别名
        alias: {
            jquery: path.join(__dirname, "js/lib/jquery-2.0.3.min.js"),
            mod: path.join(__dirname, "js/mod"),
            less: path.join(__dirname, "less")
        }
    },
    plugins: [
        // 给 $ 作为一个变量 给到每一个 module 里
        new webpack.ProvidePlugin({
            // 给每一个模块引入了 jQuery
            $: "jquery"
        }),
        // ExtractTextPlugin 将css从 bundles中抽离出来合到另一个文件中
        new ExtractTextPlugin("css/[name].css"),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer(),
                ]
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // vendor 的意义和之前相同
            // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
              names: ['vendor', 'manifest'],
              // 配合 manifest 文件使用
              minChunks: Infinity
            })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
    ]
};