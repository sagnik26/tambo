export default {
  "*.{mjs,js,jsx,ts,tsx}": (filenames) => {
    // Always format with prettier
    const commands = [
      `npx prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
    ];
    // Skip eslint for root config files to avoid workspace resolution issues
    const toLint = filenames.filter(
      (f) =>
        !f.includes("lint-staged.config.mjs") &&
        !f.includes("eslint.config.mjs"),
    );
    if (toLint.length > 0) {
      commands.push(
        `npx eslint --fix ${toLint.map((f) => `"${f}"`).join(" ")}`,
      );
    }
    return commands;
  },
  "*.{json,md,mdx,css,scss}": ["npx prettier --write"],
  "cli/src/registry/**/*": () => "npm run sync:showcase",
};
