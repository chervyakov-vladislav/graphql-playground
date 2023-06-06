import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.tsx'],
    include: ['./src/**/*.test.{js,ts,tsx,jsx}'],
    coverage: {
      all: true,
      enabled: true,
      reporter: ['text'],
      include: ['**/*.{jsx,tsx}'],
      exclude: [...configDefaults.exclude, '**/*.test.{js,ts,tsx}'],
    },
  },
});
