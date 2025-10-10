import js from "@eslint/js"
import globals from "globals"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',

      // No semicolons
      semi: ['error', 'never'],
      'no-unexpected-multiline': 'error',

      // 1. We follow the convention of naming "private" properties with a leading underscore
      // 2. This conflicts with the no-unused-vars config
      'no-underscore-dangle': 'off',

      // Multiple variable declarations (without assignment) on the same line
      // without multiple let/const
      'one-var': ['error', { initialized: 'never', uninitialized: 'always' }],
      'one-var-declaration-per-line': ['error', 'initializations'],

      // Don't require naming all non-arrow functions. Modern browsers can usually
      // detect the correct name if it's assigned to a variable or property.
      'func-names': 'off',

      // Don't require instance methods to use `this` (the rule name is confusing)
      'class-methods-use-this': 'off',

      // Turning this on addresses some quirks with using `var`. It's unnecessary
      // for `let` and `const`.
      'no-loop-func': 'off',

      // Turning this on requires destructuring in too many cases
      'prefer-destructuring': 'off',

      // Turning this on prevents directly importing sub-dependencies
      'import/no-extraneous-dependencies': 'off',

      // One-liner methods can be readable without the extra spacing
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

      // Allow assigning to properties of arguments (might consider completely disabling this rule)
      'no-param-reassign': ['error', { props: false }],

      // Sufficiently high that it won't be too annoying
      'max-len': ['warn', 130],

      // Disabled because it complains if you mix `return` with `return <value>` in a function
      'consistent-return': 'off',

      // Allow patterns like `while ((a = getNextValue()))`
      'no-cond-assign': ['error', 'except-parens'],

      // 'import/extensions': ['warn', 'ignorePackages'],

      // Default disallows mixing exponentiation with other arithmetic operators
      'no-mixed-operators': [
        'error',
        {
          allowSamePrecedence: false, // Could also make this true
          groups: [
            ['&', '|', '^', '~', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof']
          ]
        }
      ]
    }
  },
  pluginReact.configs.flat.recommended,

])