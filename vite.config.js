// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // السماح بالوصول من جميع الأجهزة على الشبكة
    port: 5173, // يمكنك تعديل المنفذ حسب الحاجة
  },
});
