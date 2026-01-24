import baseConfig from "@tambo-ai/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: [
      "react-native-sdk/eslint.config.mjs",
      "react-native-sdk/jest.config.ts",
      "showcase-react-native/eslint.config.js",
      "showcase-react-native/scripts/*.js",
    ],
  },
  {
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
];
