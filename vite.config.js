import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  base: "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        invite: resolve(__dirname, "invite.html"),
        editor: resolve(__dirname, "editor.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
