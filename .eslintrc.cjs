/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      ],
      'extends': [
        'plugin:cypress/recommended',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'comma-dangle': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'no-console': process.env.ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.ENV === 'production' ? 'warn' : 'off',
    'no-useless-catch': 'off',
    'quotes': ['error', 'single'],
    'sort-imports': ['error', {
      'ignoreCase': true,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      'allowSeparatedGroups': false,
    }],
    'semi': ['error', 'always'],
    'spaced-comment': ['error', 'always'],
    'vue/max-len': ['error', 140],
    'vue/no-v-html': 'off',
    'vue/no-unused-vars': 'off',
    'vue/require-default-prop': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
        extendDefaults: false,
      },
    ],
    '@typescript-eslint/quotes': ['error', 'single'],
  },
};
