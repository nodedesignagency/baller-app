/**
 * Design tokens measured from the Figma frame (node 1:2), which is authored
 * on a 390 x 844 artboard. Everything below is expressed in those units.
 */
export const DESIGN = { width: 390, height: 844 } as const;

export const colors = {
  /** Flat sky behind everything — the artboard is a single blue at its edges. */
  sky: "#01A3F1",
  /** Colour the sky reaches at the centre of the radial glow. */
  skyGlow: "#58D0FE",

  textOnSky: "#FFFFFF",

  googleSurface: "#FFFFFF",
  googleLabel: "#1C1C1E",
  appleSurface: "#29292B",
  appleLabel: "#FFFFFF",
} as const;

/** Radial glow ellipse, as fractions of the screen box. */
export const glow = {
  cx: 0.5,
  cy: 0.544,
  rx: 0.54,
  ry: 0.425,
  /** Opacity ramp sampled off the render; r is normalised ellipse radius. */
  stops: [
    { r: 0, opacity: 1 },
    { r: 0.3, opacity: 0.86 },
    { r: 0.55, opacity: 0.58 },
    { r: 0.75, opacity: 0.3 },
    { r: 0.9, opacity: 0.1 },
    { r: 1, opacity: 0 },
  ],
} as const;

export const headline = {
  lines: ["Meet Baller,", "where live prediction", "meets social layer."],
  fontSize: 30.5,
  lineHeight: 40,
  /** Top of the first line, as a fraction of screen height. */
  top: 0.4872,
} as const;

export const badge = {
  /** Centre of the glass disc, as fractions of the screen box. */
  cx: 0.5,
  cy: 0.4222,
  size: 72,
  glyphSize: 43,
} as const;

export const authButton = {
  height: 52,
  radius: 26,
  sideMargin: 18,
  gap: 10,
  bottomInset: 16,
  labelSize: 16,
  glyphSize: 26,
  /** Distance from the pill's left edge to the left edge of the glyph. */
  glyphInset: 14,
} as const;
