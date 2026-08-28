import type { ImageSourcePropType } from 'react-native';

const cloudA = require('../../assets/props/cloud-a.png');
const cloudB = require('../../assets/props/cloud-b.png');

/**
 * The artboard's cloudscape, built from the two supplied sprites reused at
 * several sizes. Positions are fractions of the screen box, matched against the
 * design render; each layer drifts on its own clock so the sky has depth.
 */
export type CloudSpec = {
  key: string;
  source: ImageSourcePropType;
  left: number;
  top: number;
  width: number;
  aspect: number;
  opacity: number;
  flip?: boolean;
  drift: { x: number; y: number; duration: number; phase: number };
};

export const CLOUDS: CloudSpec[] = [
  // The bank behind the ramen, top right.
  {
    key: 'ramen-bank',
    source: cloudA,
    left: 0.62,
    top: 0.088,
    width: 0.86,
    aspect: 1400 / 532,
    opacity: 0.95,
    drift: { x: 10, y: 4, duration: 52000, phase: 0 },
  },
  // Wisps across the middle of the frame.
  {
    key: 'wisp-left',
    source: cloudB,
    left: 0.13,
    top: 0.2688,
    width: 0.3514,
    aspect: 1097 / 534,
    opacity: 0.3,
    drift: { x: 14, y: 3, duration: 61000, phase: 0.3 },
  },
  {
    key: 'wisp-centre',
    source: cloudB,
    left: 0.4459,
    top: 0.2825,
    width: 0.2432,
    aspect: 1097 / 534,
    opacity: 0.24,
    flip: true,
    drift: { x: 11, y: 3, duration: 44000, phase: 0.62 },
  },
  // The haze along the bottom edge, mostly behind the auth pills.
  {
    key: 'bottom-bank',
    source: cloudB,
    left: -0.108,
    top: 0.855,
    width: 1.16,
    aspect: 1097 / 534,
    opacity: 0.9,
    drift: { x: 8, y: 3, duration: 70000, phase: 0.45 },
  },
];
