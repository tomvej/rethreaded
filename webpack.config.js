const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');

const array = (...items) => items.filter(Boolean);

module.exports = (env, {mode}) => ({
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: `${__dirname}/dist`,
    },
    plugins: array(
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
        }),
        new DefinePlugin({
            __DEVELOPMENT__: mode === 'development',
            __PRODUCTION__: mode === 'production',
        }),
        mode === 'development' && new CssExtractPlugin(),
    ),
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                mode === 'development' ? 'style-loader' : CssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            mode: 'local',
                            localIdentName: mode === 'development' ? '[name]__[local]__[hash:base64]' : '[hash:base64]',
                        },
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: sass,
                    },
                }
            ],
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '~components': `${__dirname}/src/components`,
            '~containers': `${__dirname}/src/containers`,
            '~core': `${__dirname}/src/core`,
            '~utils': `${__dirname}/src/utils`,
            '~types': `${__dirname}/src/types`,
            '~reducer': `${__dirname}/src/reducer`,
        },
    },
    devServer: {
        inline: true,
        hot: true,
        port: 8080,
    },
});
