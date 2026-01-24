// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "eslint.config.js", "scripts/**/*.js"],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: {
          allowDefaultProject: ["*.js", "eslint.config.js", "scripts/*.js"],
        },
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": [
        "error",
        {
          allow: [
            ".*\\.png$",
            ".*\\.jpg$",
            ".*\\.jpeg$",
            ".*\\.gif$",
            ".*\\.svg$",
            ".*\\.webp$",
          ],
        },
      ],
    },
  },
]);
