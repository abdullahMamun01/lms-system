module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended", // Integrate Prettier with ESLint
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "warn",
        "no-console": "warn",

        "@typescript-eslint/no-unused-vars": "off",
        "react-hooks/exhaustive-deps": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
