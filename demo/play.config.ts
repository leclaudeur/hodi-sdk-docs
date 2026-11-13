import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The playground's bundle: every component, drawn again by Hodi's own code each time a control changes. A module,
// so that what the app loads only when needed stays in files of its own.
export default defineConfig({
  plugins: [react()],
  define: { __APP_VERSION__: '"0.0.0"', 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: process.env.PLAY_OUT,
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: `${import.meta.dirname}/play.tsx`, formats: ['es'], fileName: () => 'play.js' },
    // What the app loads only when needed (the password dictionaries) stays in its own file, loaded the same way.
    rollupOptions: { output: { chunkFileNames: 'play-[hash].js' } }
  }
})
