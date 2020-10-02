module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['eslint-plugin-import', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': {
      allowTypedFunctionsExpression: true,
    },
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    'no-debugger': 'error',
    'newline-before-return': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'jest/no-disabled-tests': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-ignore': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
