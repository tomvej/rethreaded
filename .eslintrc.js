module.exports = {
    env: {
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsConfigRoot: __dirname,
        project: ['./tsconfig.json'],
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        '@typescript-eslint',
        'react',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
    ],
    rules: {
        'react/prop-types': 'off', // typescript is enough
    },
};
