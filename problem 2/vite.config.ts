import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPath from 'vite-tsconfig-paths' // tsconfig path lib

export default defineConfig({
  plugins: [react(), tsConfigPath()],

})
