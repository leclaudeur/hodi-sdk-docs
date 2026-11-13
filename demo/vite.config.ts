import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Every component of hodi:sdk on one page, drawn by Hodi's own code, for capture.cjs to copy.
export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  define: { __APP_VERSION__: '"0.0.0"' },
  build: { outDir: process.env.DEMO_OUT, emptyOutDir: true, cssCodeSplit: false, minify: false }
})
