module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 1,
    'prettier/prettier': 2,
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'latest',
    },
  }
};