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
        /* using eslint-plugin-import would have been nicer, but for some reason it breaks on default imports
           (classnames) when paired with eslint-import-resolver-typescript which is necessary for aliases */
        'simple-import-sort',
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
        'simple-import-sort/sort': 'error',
        '@typescript-eslint/unbound-method': 'off', // does not work with fp-ts
    },
};
