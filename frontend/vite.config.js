import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const repo = 'inclusiverealitylab-website'; 

export default ({ mode }) =>
  defineConfig({
    plugins: [tailwindcss(), react()],
    // Using subpath on GH Pages, root in development
    base: (mode === 'production' || mode === 'test') ? `/${repo}/` : '/',
  });
