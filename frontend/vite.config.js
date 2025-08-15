import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const repo = 'inclusiverealitylab-website';

export default ({ mode }) =>
  defineConfig({
    plugins: [tailwindcss(), react()],
    base: mode === 'ghpages' ? `/${repo}/` : '/', // root for dev+prod, repo path for preview on GitHub pages only
  })
