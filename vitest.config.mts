import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
  test: {
    globalSetup: "./lib/test/global-setup.ts",
    fileParallelism: false,
  },
});
