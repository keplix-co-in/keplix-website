import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Alternative config for custom repository names
// Rename this to vite.config.ts and update the base path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Change this to match your repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
