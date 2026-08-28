import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

type Props = {
  size: number;
  color?: string;
};

/**
 * Net grid, drawn inside the goal's inner opening (x 8.6-39.7, y 17.4-43.2).
 */
const NET_VERTICALS = [14.8, 21, 27.2, 33.4];
const NET_HORIZONTALS = [22.5, 27.5, 32.5, 37.5];

/**
 * Baller's mark: an outlined goal with its net, two balls in the mouth, and a
 * lightning bolt struck through the top-left corner.
 *
 * Drawn as line art to match the artboard, where the posts read as outlined
 * tubes rather than solid bars. The ink box is 40.3 x 39.2 of the 48 viewBox,
 * which is the proportion measured off the design.
 */
export function GoalBoltGlyph({ size, color = '#FFFFFF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {/* Net first, so the frame's outline sits on top of it. */}
      <G stroke={color} strokeWidth={0.85} opacity={0.82} strokeLinecap="round">
        {NET_VERTICALS.map((x) => (
          <Path key={`v${x}`} d={`M${x} 17.7 L${x} 42.9`} />
        ))}
        {NET_HORIZONTALS.map((y) => (
          <Path key={`h${y}`} d={`M8.9 ${y} L39.4 ${y}`} />
        ))}
      </G>

      {/* Goal frame: outer and inner edge of the same tube, plus the ground line. */}
      <G
        stroke={color}
        strokeWidth={1.7}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M4.0 43.2 L4.0 16.7 Q4.0 13.1 7.6 13.1 L40.7 13.1 Q44.3 13.1 44.3 16.7 L44.3 43.2" />
        <Path d="M8.6 43.2 L8.6 18.3 Q8.6 17.4 9.5 17.4 L38.8 17.4 Q39.7 17.4 39.7 18.3 L39.7 43.2" />
        <Path d="M4.0 43.2 L44.3 43.2" />
      </G>

      {/* Two balls sitting on the goal line. */}
      <G stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <G>
          <Circle cx={19.5} cy={36.9} r={6.2} strokeWidth={1.6} />
          <Path d="M19.5 33.1 L22.6 35.4 L21.4 39 L17.6 39 L16.4 35.4 Z" strokeWidth={1.1} />
          <G strokeWidth={1}>
            <Path d="M19.5 33.1 L19.5 30.7" />
            <Path d="M22.6 35.4 L24.9 33.9" />
            <Path d="M21.4 39 L22.9 41.3" />
            <Path d="M17.6 39 L16.1 41.3" />
            <Path d="M16.4 35.4 L14.1 33.9" />
          </G>
        </G>
        <G>
          <Circle cx={31.4} cy={37.9} r={5.2} strokeWidth={1.5} />
          <Path d="M31.4 34.7 L34 36.6 L33 39.6 L29.8 39.6 L28.8 36.6 Z" strokeWidth={1} />
          <G strokeWidth={0.9}>
            <Path d="M31.4 34.7 L31.4 32.7" />
            <Path d="M34 36.6 L35.9 35.4" />
            <Path d="M33 39.6 L34.2 41.6" />
            <Path d="M29.8 39.6 L28.6 41.6" />
            <Path d="M28.8 36.6 L26.9 35.4" />
          </G>
        </G>
      </G>

      {/* Lightning bolt, struck through the frame's top-left corner. */}
      <Path d="M10.9 4.0 L6.2 9.9 L8.8 9.9 L7.7 13.6 L12.1 7.6 L9.6 7.6 Z" fill={color} />
    </Svg>
  );
}
