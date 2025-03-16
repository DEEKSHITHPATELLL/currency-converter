import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/currency-converter/',  // 👈 Add this line (use your repo name)
});
