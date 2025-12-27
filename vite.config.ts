import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Frontend-only Vite config for the Attendance AI Buddy UI workspace
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
  }
});
