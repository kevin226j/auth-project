const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./index.tsx'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'public'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    optimization: {
        // This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles.
        splitChunks: {
            chunks: 'all'
        }
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'false',

    resolve: {
        // Add '.js', .ts', '.json', '.jsx', .tsx' as resolvable extensions.
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.jpg', '.png', '.jpeg']
    },
    devServer: {
        historyApiFallback: true,
        watchContentBase: true,
    },
    module: {
        rules: [{
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                // All files with a '.css' or '.scss' extension will be handled by 'style-loader' and 'css-loader'.
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // All files with a '.woff*' or '.woff2*' extension will be handled by 'url-loader'.
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                // All files with a '.tff*' extension will be handled by 'url-loader'.
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                // All files with a '.eot*' extension will be handled by 'file-loader'.                
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                // All files with a '.svg*' extension will be handled by 'url-loader'.
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
            {
                // All media files extension will be handled by 'file-loader', and 'image-webpack-loader'.
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[hash:8].[ext]'
                        },
                    },

                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "jquery": "jQuery"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}