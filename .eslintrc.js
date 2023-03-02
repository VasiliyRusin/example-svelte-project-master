module.exports = {
  extends: './base.eslintrc.js',
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      'rules': {
        'import/first': [0],
        'import/no-duplicates': [0],
        'import/no-mutable-exports': [0],
        'import/no-unresolve': [0],
        'import/prefer-default-export': [0]
      }
    },
  ],
  settings: {
    'svelte3/ignore-styles': () => true,
    'import/core-modules': ['svelte'],
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 0 }],
  },
};
