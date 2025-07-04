module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
  },
  overrides: [
    // TypeScript 文件
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended',
      ],
      rules: {
        'no-unused-vars': 'off', // 使用TypeScript版本
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    // React 文件
    {
      files: ['frontend/**/*.{js,jsx,ts,tsx}'],
      env: {
        browser: true,
        es6: true,
      },
      plugins: ['react', 'react-hooks'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
    },
    // 后端文件
    {
      files: ['backend/**/*.{js,ts}'],
      env: {
        node: true,
        browser: false,
      },
    },
    // 智能合约文件
    {
      files: ['contracts/**/*.{js,ts}'],
      env: {
        node: true,
        browser: false,
      },
    },
  ],
}; 