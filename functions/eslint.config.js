const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const globals = require("globals");

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    rules: {
      "quotes": ["error", "double"],
      "indent": ["error", 2],
    },
  },
  {
    ignores: ["lib/**/*", "generated/**/*", "eslint.config.js"],
  }
);
