import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5178,
    strictPort: true,
    host: true,
    proxy: {
      "/api": {
        target: "http://web:5000",  // backend service ใน Docker Compose
        changeOrigin: true,
        secure: false,  // ปิดการตรวจสอบ SSL
        rewrite: (path) => path.replace(/^\/api/, ''),  // ปรับ path ให้ถูกต้อง
      },
    },
  },
});