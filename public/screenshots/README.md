# Screenshots

The Showcase page uses these images. Right now they're **branded SVG placeholders** — replace
them with **real PNG screenshots** of your UI.

## How to capture (easiest, no live server)

1. From the script source: `cd web && npm run dev` → open `http://localhost:5173`.
2. Use the **DEV preview bar** at the top to switch surfaces (styleguide, radial, tablet, hud-*, heat, challenge…).
3. Screenshot each surface (Win+Shift+S, or your tool). Recommended size **1600×900** (16:9).

You can also capture them **in-game** for the most authentic look.

## Files to add

Save your PNGs here with **these exact names** (the Showcase page points to them):

| File | Surface |
|---|---|
| `radial.png` | Radial menu |
| `tablet.png` | Street Tablet |
| `hud.png` | Race HUD (chase/sprint) |
| `heat.png` | Heat meter |
| `challenge.png` | Challenge prompt |
| `styleguide.png` | Style guide |

Then, in `showcase.md` (and `es/showcase.md`), change each `src="/screenshots/NAME.svg"` to
`.png`. Or just delete the `.svg` once your `.png` is in place and update the extension.

> Tip: keep them optimized (< ~400 KB each) so the docs load fast.
