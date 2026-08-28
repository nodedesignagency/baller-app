# Baller — welcome screen

The Figma welcome/auth screen ([node `1:2`](https://www.figma.com/design/TepqxniFLHWL9xqRfTfmfn/Untitled?node-id=1-2))
built as a React Native app you can open in Expo Go. The layout is measured
from the artboard rather than eyeballed, and the screen animates instead of
sitting still.

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (iOS camera app, or the Expo Go app on
Android). `npx expo start --web` renders the same screen in a browser.

## What moves

| Element | Motion |
| --- | --- |
| The ten 3D props | Spring in from off-frame on a stagger, then drift on a slow sine — each with its own amplitude, period and phase, so nothing beats in time |
| Props, again | Lean with the handset via `DeviceMotion`; heavier props are given more travel, which reads as depth |
| Clouds | Drift sideways and bob on a ~48s / ~31s cycle |
| Centre badge | Scales in with overshoot, breathes, and pushes out a slow "live" ring |
| Headline | Three lines fade and rise, 90ms apart |
| Auth buttons | Slide up last; press gives a scale dip and a light haptic |

Every loop runs on the native driver (transform and opacity only). The whole
lot holds still when the OS "reduce motion" setting is on.

## How the design was reproduced

Figma's MCP server was out of tool calls for the month, so the design was
recovered from the file's public render and measured directly:

- **Geometry** — pill sizes, headline baselines, badge centre and prop
  positions were read off the render in pixels and converted to the 390 × 844
  artboard. Rendered output matches the artboard within ~1dp on baselines and
  ~2% on line widths.
- **Colour** — the sky is a flat `#01A3F1` with a radial glow reaching
  `#58D0FE` at its centre; the glow's falloff was fitted to sampled pixels and
  is drawn as an SVG radial gradient, so it stays smooth at any size.
- **The 3D props** (`assets/props/*.png`) — matted out of the render one at a
  time, de-fringed against the sky colour, then upscaled. They are faithful in
  shape, colour and placement, but they come from a 370 × 800 render, so they
  are softer than the originals. **Swapping in the real exports is a drop-in:**
  export each prop from Figma as a transparent PNG at 3x, keep the file names in
  `assets/props/`, then run `node scripts/sync-prop-aspects.mjs` to pick up the
  new proportions. If a re-export is trimmed differently, its `left`/`top`/
  `width` in `src/data/props.ts` may also need a nudge.
- **The badge mark** (goal + net + lightning bolt) is redrawn as vector art in
  `src/components/icons/GoalBoltGlyph.tsx` — the render was too small to matte
  cleanly, and it stays crisp this way.
- **The badge's glass.** The artboard uses Figma's Glass material (refraction 80,
  dispersion 50, frost 0, light 100°). React Native has no backdrop-refraction
  primitive, but what sits behind the disc is a smooth sky gradient, so the
  material is rebuilt from what refraction actually does to one: a lens
  brightening through the middle, a rim that catches light twice across the
  sphere, and a whisper of colour split along that rim.

### Assumptions worth knowing

- **Typeface**: Open Runde (SIL OFL 1.1), bundled in `assets/fonts/`. The
  artboard is 565 units wide, so its type maps straight across via `unit()` in
  `src/theme/tokens.ts`: the headline is Medium 48 / auto line height / -2%
  tracking, the button labels are Semibold 24 / 135% / +1%. Open Runde's own line height
  (1.2102em) at 48 units comes to 40.10dp, which is what the design render
  measures to within 0.03dp; the three headline lines land within 1.1% on width.
- **Bottom spacing**: the artboard puts the buttons 15dp from the frame's
  bottom edge, which is inside the home-indicator zone. The app anchors them to
  the safe-area inset instead, so they sit slightly higher on handsets that
  have one.
- **Auth is not wired up.** Both buttons call `onContinue` in `App.tsx`, which
  is where a real OAuth flow would start.

## Layout

```
App.tsx                        font loading, splash handoff
src/theme/tokens.ts            every measurement taken from the artboard
src/data/props.ts              the ten props: position, size, depth, motion
src/screens/WelcomeScreen.tsx  composition
src/components/
  SkyBackdrop.tsx              flat sky, radial glow, drifting cloud sprites
  FloatingProp.tsx             one prop: entrance, float, sway, parallax
  BrandBadge.tsx               glass disc, halo, live ring
  AuthButton.tsx               the two auth pills
  icons/                       Google, Apple, and the Baller mark
src/data/clouds.ts             where each cloud sprite sits, and how it drifts
src/hooks/
  useMotion.ts                 seamless sine loops, reduce-motion
  useTiltParallax.ts           device-motion offset
```
