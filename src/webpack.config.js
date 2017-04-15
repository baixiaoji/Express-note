var webpack = require("webpack")
var path = require("path")

module.exports = {
    entry: path.join(__dirname,"js/app/index.js"),
    output: {
        path:path.join(__dirname,"../public/js"),
        filename: "index.js"
    }
    // module:{
    //     rules: [
    //         {
    //             test: /\.less$/,
    //             user
    //         }
    //     ]
    // }
}