import { defineConfig } from "vite";
import { resolve } from "path";
import { readFile, writeFile, mkdir } from "fs/promises";

export default defineConfig({
  root: ".",
  base: "/wedding/",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
  },
  plugins: [
    {
      name: "figma-sync",
      configureServer(server) {
        // Receive SVGs from Figma plugin
        server.middlewares.use("/_sync", async (req, res) => {
          // CORS for Figma plugin iframe
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }
          if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }

          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              const { svgs } = JSON.parse(body);
              if (!svgs || typeof svgs !== "object") throw new Error("Missing svgs object");

              let count = 0;
              for (const [path, svgContent] of Object.entries(svgs)) {
                // Validate path: must be {lang}/{filename}.svg
                if (!/^(en|hu|ru)\/[\w-]+\.svg$/.test(path)) {
                  throw new Error(`Invalid path: ${path}`);
                }
                const fullPath = resolve(__dirname, "public/svg", path);
                await mkdir(resolve(fullPath, ".."), { recursive: true });
                await writeFile(fullPath, svgContent, "utf-8");
                count++;
              }

              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true, count }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
        });

        // Read raw source files for publish (avoids Vite HMR injection)
        server.middlewares.use("/_raw", async (req, res) => {
          try {
            const allowed = ["index.html"];
            const file = decodeURIComponent(req.url).replace(/^\//, "");
            if (!allowed.includes(file)) { res.statusCode = 403; res.end(); return; }
            const content = await readFile(resolve(__dirname, file), "utf-8");
            res.setHeader("Content-Type", "text/plain");
            res.statusCode = 200;
            res.end(content);
          } catch (err) {
            res.statusCode = 500;
            res.end(err.message);
          }
        });

        // Upload background images (kept from previous version)
        server.middlewares.use("/_upload-image", async (req, res) => {
          if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              const { section, data } = JSON.parse(body);
              const allowed = ["cover", "story", "announce", "locations", "rsvp"];
              if (!allowed.includes(section)) throw new Error("Invalid section");
              const dir = resolve(__dirname, `public/images/${section}`);
              await mkdir(dir, { recursive: true });
              const buf = Buffer.from(data, "base64");
              await writeFile(resolve(dir, "bg.jpg"), buf);
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ path: `/wedding/images/${section}/bg.jpg` }));
            } catch (err) {
              res.statusCode = 500;
              res.end(err.message);
            }
          });
        });
      },
    },
  ],
});
