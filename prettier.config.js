module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: '*.test.js',
      options: {
        semi: true
      }
    }
  ]
}
