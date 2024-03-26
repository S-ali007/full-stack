import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://full-stack-production-85f1.up.railway.app",
    },
  },
  plugins: [react()],
});
