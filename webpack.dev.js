const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// to extract css file to dist folder
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: '/src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
        open: true,
        inline: true,
        writeToDisk: true, //to build dist folder
        stats: 'errors-only' //to hide warning and webpack info
    },

    module: {
        rules: [{
                test: /\.m?js$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                // MiniCssExtractPlugin.loader to extract main.css file or 'style-loader' to inject css in js file
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')({})
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/i,
                // MiniCssExtractPlugin.loader to extract main.css file , 'style-loader' to inject css in js file
                use: [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')({}),
                            ]
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    },
    // source-map => for tracking prod issues
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve('./src/client/views/index.html')
        }),
        new CleanWebpackPlugin(), new MiniCssExtractPlugin({

        }),
        new WorkboxPlugin.GenerateSW()
    ]
};