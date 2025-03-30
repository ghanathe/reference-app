import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures correct base path for routing
  server: {
    // https: {
    //   key: fs.readFileSync('./certs/nginx.key'),
    //   cert: fs.readFileSync('./certs/nginx.crt'),
    // },
    // host: 'reference-app',
    allowedHosts: true,
    port: 3030, // Run on HTTPS
    proxy: {
      '/api': {
        target: 'http://reference-backend:9092',
        changeOrigin: true,
      },
    },

    
  },
});

