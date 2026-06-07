import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/rentwise-ai-spark/",
  plugins: [react(), tailwindcss(), tsConfigPaths()],
});
