module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off'
      }
    },
    {
      files: ['test/**/*.spec.ts'],
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.spec.json'
      }
    }
  ]
}
