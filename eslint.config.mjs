import globals from "globals";
import cypress from "eslint-plugin-cypress";
import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-undef": "error",
        "no-unused-vars": "warn",
    },
}, {
    files: ["**/cypress.config.js"],

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },

    rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
    },
}, ...compat.extends("plugin:cypress/recommended").map(config => ({
    ...config,
    files: ["**/*.cy.js"],
})), {
    files: ["**/*.cy.js"],

    plugins: {
        cypress,
    },

    languageOptions: {
        globals: {
            ...cypress.environments.globals.globals,
        },
    },

    rules: {
        "cypress/no-unnecessary-waiting": "off",
        "no-unused-vars": "off",
    },
}, ...compat.extends("plugin:jest/recommended").map(config => ({
    ...config,
    files: ["**/*.test.js"],
})), {
    files: ["**/*.test.js"],

    plugins: {
        jest,
    },

    languageOptions: {
        globals: {
            ...globals.jest,
        },
    },

    rules: {
        "jest/prefer-expect-assertions": "off",
    },
}];