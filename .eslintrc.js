module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'import',
  ],
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/return-await': ['error', 'always'],
    'simple-import-sort/imports': 'error',
    'import/first': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-duplicates': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'warn',
  },
  ignorePatterns: ['.eslintrc.js', '**/*.generated.ts', '**/migrations/*.ts']
};
