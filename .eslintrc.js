// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // 'import/extensions': ['error', 'always', {
        //     'js': 'never',
        //     'vue': 'never'
        // }],
        // 'import/no-extraneous-dependencies': ['error', {
        //     'optionalDependencies': ['test/unit/index.js']
        // }],
        'no-debugger': process.env.NODE_PATH === 'production' ? 2 : 0,
        'no-console': process.env.NODE_PATH === 'production' ? 2 : 0,
        // 'no-bitwise': 0,
        // 'no-await-in-loop': 0,
        // 'comma-dangle': [
        //     0,
        //     'never'
        // ],
        'semi': [
            0,
            'never'
        ],
        // 'linebreak-style': 0,
        'indent': 0,
        // 'indent': [
        //     2,
        //     4,
        //     {
        //         'SwitchCase': 1
        //     }
        // ],
        // 'prefer-template': 0,
        // 'sort-vars': 0,
        // 'no-var': 0,
        // 'vars-on-top': 0,
        // 'no-return-assign': 1,
        // 'no-invalid-this': 0,
        // 'no-void': 0,
        // 'one-var': [
        //     0,
        //     'always'
        // ],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-trailing-spaces': [
            2,
            {
                'skipBlankLines': true
            }
        ],
        'no-multi-spaces': 0,
        'space-before-function-paren': [2, 'never'],
        'comma-dangle': 0,
        'no-extend-native': 0,
    }
}
