import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir:
      "/opt/alw/frappe-bench/apps/changelog_claudion/changelog_claudion/public/frontend",
    emptyOutDir: true,
  },
});
