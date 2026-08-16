import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const repo = 'inclusiverealitylab-website';

// public/ is copied to the output verbatim -- that is the point of it, and Vite
// offers no filter for that directory. macOS drops a .DS_Store into any folder
// Finder has opened, so without this one gets published with the site on every
// build, listing the directory's contents. .gitignore does not help: it keeps
// the file out of the repo, not out of the build.
const stripDSStore = () => {
  let outDir = 'dist'
  return {
    name: 'strip-ds-store',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const walk = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) walk(full)
          else if (entry.name === '.DS_Store') fs.rmSync(full)
        }
      }
      if (fs.existsSync(outDir)) walk(outDir)
    },
  }
}

export default ({ mode }) =>
  defineConfig({
    plugins: [tailwindcss(), react(), stripDSStore()],
    base: mode === 'ghpages' ? `/${repo}/` : '/', // root for dev+prod, repo path for preview on GitHub pages only
  })
