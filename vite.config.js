import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages - change 'cur-port2' to your repository name
  // If your repo is 'username.github.io', use base: '/'
  base: process.env.GITHUB_PAGES ? '/Portfolio26/' : '/',
})
