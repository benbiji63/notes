import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

const defaultConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3001',
  //       changeOrigin: true,
  //     },
  //   },
  // },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'dev') {
    const isDev = mode === 'development';
    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: isDev
              ? 'https://localhost:3001'
              : 'https://notes-app-3i08.onrender.com',
            changeOrigin: isDev,
            secure: !isDev,
          },
        },
      },
    };
  } else {
    return defaultConfig;
  }
});
