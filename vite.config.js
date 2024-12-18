import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import dns from 'dns'

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    host: true,
    port: 8080,
  },
});
