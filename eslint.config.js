const path = require('path'),
  js = require('@eslint/js'),
  react = require('eslint-plugin-react'),
  reactHooks = require('eslint-plugin-react-hooks'),
  prettier = require('eslint-plugin-prettier'),
  prettierConfig = require('eslint-config-prettier'),
  babelParser = require('@babel/eslint-parser'),
  globals = require('globals');

module.exports = [
  // ESLint recommended
  js.configs.recommended,

  // Prettier config (disables conflicting rules)
  prettierConfig,

  // Main configuration
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
          arrowFunctions: true,
          restParams: true,
          experimentalObjectRestSpread: true,
        },
        babelOptions: {
          configFile: path.join(__dirname, 'babel.config.js'),
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2015,
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      prettier: prettier,
    },
    rules: {
      // React recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // React Hooks recommended
      ...reactHooks.configs.recommended.rules,

      // Custom overrides
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-empty': 'warn',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // Ensure React hooks rules are active
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      'import/resolver': 'webpack',
      react: {
        version: 'detect',
      },
    },
  },
];
