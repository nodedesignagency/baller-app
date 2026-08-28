import type { ImageSourcePropType } from 'react-native';

/**
 * The ten 3D props that ring the frame. Positions and sizes were measured off
 * the Figma render and are stored as fractions of the screen box so the
 * composition holds its shape on any handset.
 *
 * `bleed` nudges props that the artboard clips at its edge a little further
 * out, so that their cut edge stays off-screen while they drift.
 */
export type PropSpec = {
  key: string;
  source: ImageSourcePropType;
  /** Fraction of screen width / height for the prop's top-left corner. */
  left: number;
  top: number;
  /** Fraction of screen width. Height follows from the image's aspect ratio. */
  width: number;
  aspect: number;
  bleed: { x: number; y: number };
  /** Parallax weight — larger props read as nearer and move further on tilt. */
  depth: number;
  /** Where the prop flies in from on first paint, in dp. */
  entry: { x: number; y: number; rotate: number };
  float: { amplitude: number; duration: number; phase: number };
  sway: { degrees: number; duration: number; phase: number };
  /** Order in the entrance stagger. */
  order: number;
};

export const PROPS: PropSpec[] = [
  {
    key: 'burger',
    source: require('../../assets/props/burger.png'),
    left: 0.0054,
    top: 0.0025,
    width: 0.1838,
    aspect: 408 / 504,
    bleed: { x: -5, y: -5 },
    depth: 1.0,
    entry: { x: -70, y: -90, rotate: -18 },
    float: { amplitude: 7, duration: 5200, phase: 0.0 },
    sway: { degrees: 3.5, duration: 7400, phase: 0.15 },
    order: 1,
  },
  {
    key: 'gloves',
    source: require('../../assets/props/gloves.png'),
    left: 0.3324,
    top: 0.0025,
    width: 0.2946,
    aspect: 654 / 384,
    bleed: { x: 0, y: -5 },
    depth: 0.85,
    entry: { x: 0, y: -110, rotate: 10 },
    float: { amplitude: 8, duration: 6100, phase: 0.35 },
    sway: { degrees: 3, duration: 8200, phase: 0.5 },
    order: 0,
  },
  {
    key: 'plane',
    source: require('../../assets/props/plane.png'),
    left: 0.7514,
    top: 0.0025,
    width: 0.2432,
    aspect: 540 / 486,
    bleed: { x: 5, y: -5 },
    depth: 0.9,
    entry: { x: 80, y: -80, rotate: 16 },
    float: { amplitude: 9, duration: 5600, phase: 0.6 },
    sway: { degrees: 4, duration: 6800, phase: 0.2 },
    order: 2,
  },
  {
    key: 'ramen',
    source: require('../../assets/props/ramen.png'),
    left: 0.7892,
    top: 0.1388,
    width: 0.2054,
    aspect: 456 / 564,
    bleed: { x: 6, y: 0 },
    depth: 0.75,
    entry: { x: 90, y: -30, rotate: 14 },
    float: { amplitude: 6, duration: 6600, phase: 0.15 },
    sway: { degrees: 3, duration: 7800, phase: 0.75 },
    order: 4,
  },
  {
    key: 'ticket',
    source: require('../../assets/props/ticket.png'),
    left: 0.0054,
    top: 0.2075,
    width: 0.2541,
    aspect: 564 / 474,
    bleed: { x: -6, y: 0 },
    depth: 0.8,
    entry: { x: -95, y: 20, rotate: -14 },
    float: { amplitude: 7, duration: 5900, phase: 0.5 },
    sway: { degrees: 3.5, duration: 7100, phase: 0.35 },
    order: 3,
  },
  {
    key: 'card',
    source: require('../../assets/props/card.png'),
    left: 0.0054,
    top: 0.3663,
    width: 0.127,
    aspect: 282 / 534,
    bleed: { x: -6, y: 0 },
    depth: 0.65,
    entry: { x: -70, y: 40, rotate: -12 },
    float: { amplitude: 6, duration: 7000, phase: 0.8 },
    sway: { degrees: 3, duration: 8600, phase: 0.1 },
    order: 6,
  },
  {
    key: 'goal',
    source: require('../../assets/props/goal.png'),
    left: 0.7595,
    top: 0.3275,
    width: 0.2351,
    aspect: 522 / 468,
    bleed: { x: 6, y: 0 },
    depth: 0.7,
    entry: { x: 95, y: 30, rotate: 12 },
    float: { amplitude: 6, duration: 6400, phase: 0.25 },
    sway: { degrees: 2.5, duration: 9000, phase: 0.6 },
    order: 5,
  },
  {
    key: 'ball',
    source: require('../../assets/props/ball.png'),
    left: 0.4784,
    top: 0.7225,
    width: 0.1838,
    aspect: 408 / 414,
    bleed: { x: 0, y: 0 },
    depth: 1.15,
    entry: { x: 0, y: 120, rotate: -22 },
    float: { amplitude: 11, duration: 4600, phase: 0.45 },
    sway: { degrees: 6, duration: 5800, phase: 0.0 },
    order: 7,
  },
  {
    key: 'coffee',
    source: require('../../assets/props/coffee.png'),
    left: 0.0054,
    top: 0.7588,
    width: 0.1784,
    aspect: 396 / 546,
    bleed: { x: -6, y: 0 },
    depth: 0.95,
    entry: { x: -80, y: 70, rotate: -14 },
    float: { amplitude: 6, duration: 6200, phase: 0.7 },
    sway: { degrees: 2.5, duration: 7600, phase: 0.4 },
    order: 8,
  },
  {
    key: 'boot',
    source: require('../../assets/props/boot.png'),
    left: 0.6243,
    top: 0.7938,
    width: 0.3703,
    aspect: 822 / 252,
    bleed: { x: 7, y: 0 },
    depth: 1.05,
    entry: { x: 110, y: 60, rotate: 12 },
    float: { amplitude: 5, duration: 5400, phase: 0.9 },
    sway: { degrees: 2, duration: 8000, phase: 0.55 },
    order: 9,
  },
];
