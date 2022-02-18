module.exports = {
    'root': true,
    'env': {
        'node': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'vue/multi-word-component-names': ['off', {
            'ignores': []
        }]
    }
}
