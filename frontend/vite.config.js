import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const repo = 'inclusiverealitylab-website'; 

export default ({ mode }) =>
  defineConfig({
    plugins: [tailwindcss(), react()],
    base: mode === 'production' ? `/${repo}/` : '/', // asset paths
  });
