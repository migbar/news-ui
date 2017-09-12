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
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off"
  }
};
