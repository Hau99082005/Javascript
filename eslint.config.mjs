import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import compat from "@eslint/compat"; // nếu bạn định dùng `compat.extends`
import { defineConfig } from "eslint/config";

export default defineConfig([
    // Cấu hình cho JS
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: {
            js
        },
        languageOptions: {
            globals: globals.browser
        },
        extends: ["js/recommended"]
    },

    // Cấu hình cho React
    pluginReact.configs.flat.recommended,

    // Cấu hình mở rộng từ Next.js + TypeScript + custom rules
    {
        ...compat.extends("next/core-web-vitals", "next/typescript"),
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off"
        }
    }
]);