module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Disable rules that conflict with Next.js and TypeScript
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    // Add more custom rules here
  },
  settings: {
    next: {
      rootDir: '.',
    },
  },
} 