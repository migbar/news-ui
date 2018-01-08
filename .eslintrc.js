module.exports = {
  globals: {
    server: true,
    process: true
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended' // or 'plugin:ember/base'
  ],
  env: {
    browser: true
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off"
  }
};
