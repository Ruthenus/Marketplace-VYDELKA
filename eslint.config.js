// eslint.config.js

import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import {defineConfig, globalIgnores} from "eslint/config"


export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      react,
      // "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {jsx: true},
        sourceType: "module",
      },
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        {allowConstantExport: true},
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": ["error", {varsIgnorePattern: "^[A-Z_]"}],
      "indent": ["error", 2], // відступи 2 пробіли
      "max-len": ["warn", {code: 80}], // попередження про довжину рядка
      "semi": ["error", "never"],  // свідома заборона крапки з комою
      "no-unexpected-multiline": "error", // важливо для безпечної роботи без ;
      "space-before-blocks": "error",
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }],
      "keyword-spacing": "error",
      "react/jsx-no-script-url": "error",
      "react/jsx-no-comment-textnodes": "error",
      "react/jsx-no-literals": "off",
      "react/prop-types": "off",
    },
  },
])