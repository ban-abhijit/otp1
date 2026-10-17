# Glass "Bash" Button with Magic UI Border Beam & Shatter Effect

An interactive, hyper-realistic **Glassmorphism Button** featuring:
1. **Magic UI Border Beam**: Glowing animated beam traveling around the perimeter of the glass container. Reference: [Magic UI Border Beam](https://magicui.design/docs/components/border-beam).
2. **True Glass Aesthetics**: Multi-layer frosted glass, `backdrop-filter: blur(20px)`, specular reflections, 3D curved glare, and bevel rim lighting.
3. **Dynamic Cracking Physics**: Procedural glass fracture generation centered precisely at the user's click coordinates `(x, y)`.
4. **Shatter Particles & Jolt**: Screen shake and flying glass shards on impact.
5. **Web Audio Sound Effects**: High-frequency crystalline glass crack snap synthesized on-the-fly (zero audio file dependencies).
6. **Text**: Styled with `Bash` terminal aesthetics and prompt indicator.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🧩 Components Overview

- `src/components/BorderBeam.jsx`: Magic UI-compatible border beam using CSS `offset-path: rect(...)` and dynamic gradient mask.
- `src/components/GlassBashButton.jsx`: The primary glass button with procedural SVG spiderweb crack generator, burst shards, and Web Audio API shatter sound.
- `src/App.jsx`: Interactive demo environment with audio toggles, color presets, and real-time strike telemetry.
