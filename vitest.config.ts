/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';

// eslint-disable-next-line import/no-default-export -- This is a vitest config so it should have a default export
export default defineConfig({
  plugins: [react()],
  test: {
    // Test configuration options go here
    globals: true, // if you want to have describe, it, etc. in the global scope
    environment: "jsdom", // for testing browser-like environment
  },
});
