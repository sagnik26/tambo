import baseConfig from "@tambo-ai/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: [
      "dist/**",
      "esm/**",
      "node_modules/**",
      "jest.config.ts",
      "eslint.config.mjs",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: [
            "*.mjs",
            "*.ts",
            "eslint.config.mjs",
            "jest.config.ts",
          ],
        },
      },
    },
  },
];
