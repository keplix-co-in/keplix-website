import { defineConfig } from 'vitest/config';

// Vitest only picks up *.test.ts(x). The existing *.test.mjs files use
// node:test and run via `npm run test:node`; vitest can't execute them.
export default defineConfig({
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
});
