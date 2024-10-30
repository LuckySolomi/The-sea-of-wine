import globals from "globals";
import pluginJs from "@eslint/js";
export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    files: ["**/*.js",], // Add your file types here
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
];