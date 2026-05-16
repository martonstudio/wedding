// Wedding Invite — Push to Preview
// Exports frames 01–04 from each language group as SVG (text outlined),
// skipping any child group named "BG", and sends to the local Vite dev server.

const LANG_MAP = {
  english: "en",
  russian: "ru",
  hungarian: "hu",
};

const FRAME_PREFIX = ["01_", "02_", "03_", "04_"];

figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "push") {
    try {
      const page = figma.currentPage;
      const svgs = {};
      let exported = 0;

      for (const group of page.children) {
        const lowerName = group.name.toLowerCase();
        const langKey = Object.keys(LANG_MAP).find((k) => lowerName.includes(k));
        const langCode = langKey ? LANG_MAP[langKey] : null;
        if (!langCode) continue;

        for (const frame of group.children) {
          const isTargetFrame = FRAME_PREFIX.some((p) =>
            frame.name.startsWith(p)
          );
          if (!isTargetFrame) continue;

          // Hide background component instance (same name as frame) and Overlay rects
          const hiddenNodes = [];
          for (const child of frame.children) {
            if (
              (child.type === "INSTANCE" && child.name === frame.name) ||
              (child.type === "GROUP" && child.name.toUpperCase() === "BG") ||
              child.name === "Overlay"
            ) {
              if (child.visible) {
                child.visible = false;
                hiddenNodes.push(child);
              }
            }
          }

          // Export as SVG string with text outlined
          const svgString = await frame.exportAsync({
            format: "SVG_STRING",
            svgOutlineText: true,
            svgSimplifyStroke: true,
          });

          // Restore hidden nodes
          for (const node of hiddenNodes) {
            node.visible = true;
          }

          const filename = `${langCode}/${frame.name.toLowerCase()}.svg`;
          svgs[filename] = svgString;
          exported++;
        }
      }

      figma.ui.postMessage({
        type: "export-done",
        svgs,
        count: exported,
      });
    } catch (err) {
      figma.ui.postMessage({
        type: "export-error",
        error: err.message,
      });
    }
  }
};
