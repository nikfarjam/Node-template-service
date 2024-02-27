import { Configuration, RuleSetRule } from 'webpack';
import { resolve } from 'path';

const config: Configuration = {
    entry: './src/app/App.ts',
    mode: 'production',
    target: 'node',
    module: {
        rules: [
            {
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'dist')
    }
}

export default config;