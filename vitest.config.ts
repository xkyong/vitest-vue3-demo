import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

/**
 * you should include this plugin here, otherwise vitest will emit error:
 * `Error: Failed to parse source for import analysis because the content contains invalid 
 * JS syntax. Install @vitejs/plugin-vue to handle .vue files.` when includes sfc in .test files.
 * more detail see: https://stackoverflow.com/questions/77428712/unable-to-run-vue-component-tests-with-vitest
 * */ 
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    // you should set `environment` to `jsdom` in spa web app, otherwise vitest will emit error: `document is not defined`
    environment: 'jsdom',
    /* for example, use global to avoid globals imports (describe, test, expect): */
    globals: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
