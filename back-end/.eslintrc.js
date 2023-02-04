module.exports = {
    extends: [
        'airbnb',
        'prettier',
        'plugin:node/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    plugins: ['prettier', 'import'],
    settings: {
        'import/resolver': {
            'babel-module': {},
        },
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'func-names': 'off',
        'no-process-exit': 'off',
        'object-shorthand': 'off',
        'class-methods-use-this': 'off',
        'node/no-unsupported-features/es-syntax': [
            'error',
            { ignores: ['modules'] },
        ],
        'no-underscore-dangle': 0,
        'import/no-unresolved': 2,
        'node/no-missing-import': 0,
        'import/named': 2,
        'import/namespace': 2,
        'import/default': 2,
        'import/export': 2,
        'import/prefer-default-export': 0,
    },
};
