module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: ['*.test.js', 'test/*.js'],
      options: {
        semi: true,
      },
    },
    {
      files: '*.config.js',
      options: {
        semi: true,
        trailingComma: 'all',
      },
    },
  ],
};
