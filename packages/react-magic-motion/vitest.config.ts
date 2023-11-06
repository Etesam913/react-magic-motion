/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

// eslint-disable-next-line import/no-default-export -- This is a vitest config so it should have a default export
export default defineConfig({
  test: {
    // Test configuration options go here
    globals: true, // if you want to have describe, it, etc. in the global scope
    environment: 'jsdom', // for testing browser-like environment
  },
})