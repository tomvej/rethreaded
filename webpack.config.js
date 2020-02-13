const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');

module.exports = (env, {mode}) => ({
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: `${__dirname}/dist`,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
        }),
        new DefinePlugin({
            __DEVELOPMENT__: mode === 'development',
            __PRODUCTION__: mode === 'production',
        }),
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        inline: true,
        hot: true,
        port: 8080,
    },
});
