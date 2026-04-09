import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pngPath = path.join(root, "sk-logo-dark.png");
const buf = fs.readFileSync(pngPath);
const w = buf.readUInt32BE(16);
const h = buf.readUInt32BE(20);
const r = Math.round(Math.min(w, h) * 0.22);
const b64 = buf.toString("base64");
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${w} ${h}">
<defs><clipPath id="r"><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}"/></clipPath></defs>
<image width="${w}" height="${h}" href="data:image/png;base64,${b64}" clip-path="url(#r)" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
const out = path.join(root, "favicon.svg");
fs.writeFileSync(out, svg);
console.log("Wrote", out, { w, h, r, svgBytes: Buffer.byteLength(svg) });
