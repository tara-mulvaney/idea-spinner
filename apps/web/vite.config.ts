import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const base = "/spinner/";

export default defineConfig({
  base,
  plugins: [vue()],
  publicDir: "src/static",
  server: {
    base,
    open: true,
  },
});
