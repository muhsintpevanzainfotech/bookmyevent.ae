import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    base: "/",
    server: {
      port: Number(env.VITE_PORT) || 5000,
      host: true,
      strictPort: true,
    },
    preview: {
      port: 5000,
    },
  };
});
