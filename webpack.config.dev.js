const path = require("path")
const htmlwebpackplugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const copyPlugin = require("copy-webpack-plugin")
const dotenv = require("dotenv-webpack")
module.exports = {
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode:"development",
    watch:true,
    resolve:{
        extensions:[".js","jsx"],
        alias:{
            "@utils": path.resolve(__dirname,"src/utils/"),
            "@templates": path.resolve(__dirname,"src/templates/"),
            "@styles": path.resolve(__dirname,"src/styles/"),
            "@images": path.resolve(__dirname,"src/assets/images/"),
     }
    },
    module:{
        rules:[
            {
                test:/\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|.styl$/i,
                use:[MiniCssExtractPlugin.loader, 
                    "css-loader",
                    "stylus-loader"]
            },
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                  filename: "assets/fonts/[hash][ext]",
                },
            }
        ]
    },
    plugins:[
        new htmlwebpackplugin({
            inject: true,
            template: "./public/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"assets/[name].[contenthash].css"
        }),
        new copyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to:"assets/images"
                }
            ]
        }),
        new dotenv()
    ]
}

