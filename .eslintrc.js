module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
    },
    extends: [
        "eslint:recommended", // "eslint-config-prettier"
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    plugins: ["vue"],
};
