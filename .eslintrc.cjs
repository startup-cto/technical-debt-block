module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
  rules: {
    // Too slow
    'import/namespace': 'off',
    'prettier/prettier': 'error',
    'no-console': ['error'],
    'no-else-return': ['error'],
    'no-lonely-if': ['error'],
    'no-nested-ternary': ['error'],
    'no-param-reassign': ['error'],
    'no-promise-executor-return': ['error'],
    'no-return-assign': ['error'],
    'no-return-await': ['error'],
    'no-self-compare': ['error'],
    'no-template-curly-in-string': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unneeded-ternary': ['error'],
    'no-unreachable-loop': ['error'],
    'no-useless-call': ['error'],
    'no-useless-concat': ['error'],
    'prefer-template': ['error'],
    'object-shorthand': ['error'],
    'prefer-destructuring': ['error'],
    'require-atomic-updates': ['error']
  },
  overrides: [{
    files: ['*.ts', '*.tsx'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./tsconfig.json']
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:import/typescript'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        destructuredArrayIgnorePattern: "^_",
        argsIgnorePattern: "^_(?!id)"
      }],
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10
      }]
    }
  }, {
    files: ['*.jsx', '*.tsx', '*/storybook/preview.js'],
    extends: ["plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
    env: {
      browser: true
    },
    rules: {
      "react/jsx-uses-react": "error"
    }
  }, {
    files: ['test/**', '*.test.*'],
    extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:jest-formatting/strict'],
    rules: {
      'jest/expect-expect': ['error', {
        // testing AWS CDK does not require to use an expect
        // but has a custom hasResourceProperties matcher for cloud formation templates
        assertFunctionNames: ['expect', '*.hasResourceProperties']
      }]
    }
  }, {
    files: ['test/**.ts', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      // Allow unbound methods in expect statements for testing spies
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': 'error'
    }
  }],
  settings: {
    react: {
      version: "detect"
    },
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
};