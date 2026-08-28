/**
 * Design tokens for the Figma frame (node 1:2).
 *
 * The artboard is 565 x 1222.7 units. Values below are in dp for a 390pt-wide
 * screen, which is the same aspect; `unit()` converts an artboard measurement.
 */
export const DESIGN = { width: 390, height: 844 } as const;

/** Artboard units -> dp on a 390pt-wide screen. */
export const unit = (n: number) => (n * 390) / 565;

export const colors = {
  /** Flat sky behind everything — the artboard is a single blue at its edges. */
  sky: '#01A3F1',
  /** Colour the sky reaches at the centre of the radial glow. */
  skyGlow: '#58D0FE',

  textOnSky: '#FFFFFF',

  googleSurface: '#FFFFFF',
  googleLabel: '#1C1C1E',
  appleSurface: '#29292B',
  appleLabel: '#FFFFFF',
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

/** Open Runde's own line height: (hhea ascent - descent) / unitsPerEm. */
const AUTO_LINE_HEIGHT = 1.2102;

export const headline = {
  lines: ['Meet Baller,', 'where live prediction', 'meets social layer.'],
  /** Open Runde Medium 48 / auto / -2%, per the artboard. */
  fontSize: unit(48),
  lineHeight: unit(48) * AUTO_LINE_HEIGHT,
  letterSpacing: unit(48) * -0.02,
  /** Top of the first line, as a fraction of screen height. */
  top: 0.4853,
} as const;

export const badge = {
  /** Centre of the glass disc, as fractions of the screen box. */
  cx: 0.5,
  cy: 0.4222,
  size: 74.5,
  glyphSize: 51,
} as const;

export const authButton = {
  height: 52,
  radius: 26,
  sideMargin: 18,
  gap: 10,
  bottomInset: 16,
  /** Open Runde Semibold 24 / 135% / +1%, per the artboard. */
  labelSize: unit(24),
  labelLineHeight: unit(24) * 1.35,
  labelLetterSpacing: unit(24) * 0.01,
  glyphSize: 26,
  /** Distance from the pill's left edge to the left edge of the glyph. */
  glyphInset: 14,
} as const;
