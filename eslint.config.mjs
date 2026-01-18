import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const eslintConfig = defineConfig([
  ...nextTs,
  globalIgnores([
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**",
    "out/**",
  ]),
  {
    settings: {
      next: {
        rootDir: [configDir],
      },
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
  },
]);

export default eslintConfig;
