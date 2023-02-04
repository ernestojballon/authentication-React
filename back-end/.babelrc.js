const path = require('path');

const plugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ['./src/'],
            alias: {
                '#Services': path.resolve(__dirname, 'src/services'),
                '#Config': path.resolve(__dirname, 'src/config'),
                '#Utils': path.resolve(__dirname, 'src/utils'),
                '#Middlewares': path.resolve(__dirname, 'src/middlewares'),
            },
        },
    ],
];
module.exports = {
    presets: ['@babel/preset-env'],
    plugins,
};
