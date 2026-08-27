import React from "react";
import Svg, { Circle, G, Path, Polygon } from "react-native-svg";

type Props = {
  size: number;
  color?: string;
  /** Shows through the soccer balls' panel markings. */
  voidColor?: string;
};

const NET_VERTICALS = [15.5, 21.5, 27.5, 33.5];
const NET_HORIZONTALS = [22, 28, 34, 40];

/**
 * Baller's mark: a goal with its net, a lightning bolt struck off the top-left
 * corner, and two balls sitting in the mouth. Rebuilt as vector art from the
 * Figma frame's centre badge.
 */
export function GoalBoltGlyph({
  size,
  color = "#FFFFFF",
  voidColor = "#37BCF8",
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {/* Net, clipped visually by sitting under the frame. */}
      <G stroke={color} strokeWidth={1.1} opacity={0.9} strokeLinecap="round">
        {NET_VERTICALS.map((x) => (
          <Path key={`v${x}`} d={`M${x} 17.4 L${x} 43.4`} />
        ))}
        {NET_HORIZONTALS.map((y) => (
          <Path key={`h${y}`} d={`M10.6 ${y} L38.6 ${y}`} />
        ))}
        <Path d="M12.4 18.6 L21.4 43.2" opacity={0.75} />
      </G>

      {/* Goal frame: two posts and a crossbar, open at the ground. */}
      <Path
        d="M9.2 44.4 L9.2 20.2 Q9.2 16.4 13 16.4 L36.2 16.4 Q40 16.4 40 20.2 L40 44.4"
        stroke={color}
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
      />
      {/* Ground line the posts stand on. */}
      <Path
        d="M10.9 44.4 L38.3 44.4"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />

      {/* Two balls in the goal mouth. */}
      <G>
        <Circle cx={19.4} cy={38.6} r={4.6} fill={color} />
        <Polygon
          points="19.4,35.6 21.7,37.3 20.8,40 18,40 17.1,37.3"
          fill={voidColor}
        />
        <Circle cx={30.4} cy={39.4} r={3.9} fill={color} />
        <Polygon
          points="30.4,36.9 32.4,38.3 31.6,40.6 29.2,40.6 28.4,38.3"
          fill={voidColor}
        />
      </G>

      {/* Lightning bolt, struck clear of the frame. */}
      <Path
        d="M10.4 3.2 L4.6 11.6 L8.2 11.6 L6.6 17.4 L12.6 8.8 L8.9 8.8 Z"
        fill={color}
      />
    </Svg>
  );
}
