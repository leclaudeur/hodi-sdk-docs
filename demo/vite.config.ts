import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// Copied into Hodi's web folder by build.sh: the app reads its limits from config.yml, as Hodi's own build does.
import { hodiConfig } from '../config-plugin.ts'

const config = hodiConfig(`${import.meta.dirname}/../../config.yml`)

// Every component of hodi:sdk on one page, drawn by Hodi's own code, for capture.cjs to copy.
export default defineConfig({
  root: import.meta.dirname,
  plugins: [react(), config],
  define: { __APP_VERSION__: '"0.0.0"' },
  build: { outDir: process.env.DEMO_OUT, emptyOutDir: true, cssCodeSplit: false, minify: false }
})
