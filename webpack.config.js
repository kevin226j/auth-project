const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
    .filter((x) => {
        return ['.bin'].indexOf(x) == -1;
    })
    .forEach((mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './lib/server.ts',
    target: 'node',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'sourcemap',
    resolve: {
        //add .ts and .tsx as a resolvable extension
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    // Target node directory paths
    node: {
        __dirname: false
    },
    target: 'node',
    externals: nodeModules
}