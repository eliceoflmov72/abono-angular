module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:@angular-eslint/recommended", "eslint:recommended"],
  plugins: ["prettier"],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },

  overrides: [
    {
      files: ["**/tests/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
