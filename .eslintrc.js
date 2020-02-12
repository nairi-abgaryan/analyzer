module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-base',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['**/*spec.ts'] },
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'import/no-cycle': 'off',
        'func-names': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        'no-extend-native': 'off',
        'no-param-reassign': 'off',
        'no-dupe-class-members': 'off',
        'new-cap': 'off'
    },
    ignorePatterns: ['src/migrations'],
};