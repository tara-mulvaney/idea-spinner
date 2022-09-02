import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  publicDir: "src/static",
  server: {
    base: "/spinner/",
    open: true,
  },
});
