import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The playground's bundle: every component, drawn again by Hodi's own code each time a control changes. A module,
// so that what the app loads only when needed stays in files of its own.
export default defineConfig({
  plugins: [react()],
  // Each render's dialog is alone in its window (dialog-stack.ts), never stops the page from scrolling
  // (remove-scroll.tsx), and the question before deleting stays open after a click (confirm.ts).
  resolve: {
    alias: [
      { find: /^.*\/lib\/dialog-stack\.ts$/, replacement: `${import.meta.dirname}/dialog-stack.ts` },
      { find: /^react-remove-scroll$/, replacement: `${import.meta.dirname}/remove-scroll.tsx` },
      { find: /^.*\/lib\/confirm\.ts$/, replacement: `${import.meta.dirname}/confirm.ts` }
    ]
  },
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
