/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Render publishes this folder.
    outDir: 'build',
  },
  test: {
    environment: 'node',
  },
});
