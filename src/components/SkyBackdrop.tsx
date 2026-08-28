import React from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colors, glow } from '../theme/tokens';
import { sine, useLoop } from '../hooks/useMotion';

type Props = {
  width: number;
  height: number;
  /** Suppressed when the OS asks for reduced motion. */
  animate: boolean;
};

/**
 * The sky: a flat blue field, the soft radial glow the artboard puts behind the
 * headline, the cloud bank lifted out of the design, and the haze along the
 * bottom edge. Only the clouds move, and only just.
 */
export function SkyBackdrop({ width, height, animate }: Props) {
  const drift = useLoop(48000, animate);
  const bob = useLoop(31000, animate);

  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.sky }]}
      pointerEvents="none"
    >
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="skyGlow"
            cx={`${glow.cx * 100}%`}
            cy={`${glow.cy * 100}%`}
            rx={`${glow.rx * 100}%`}
            ry={`${glow.ry * 100}%`}
            gradientUnits="objectBoundingBox"
          >
            {glow.stops.map((stop) => (
              <Stop
                key={stop.r}
                offset={stop.r}
                stopColor={colors.skyGlow}
                stopOpacity={stop.opacity}
              />
            ))}
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#skyGlow)" />
      </Svg>

      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX: sine(drift, 9, 0) }, { translateY: sine(bob, 5, 0.25) }],
          },
        ]}
      >
        <Image
          source={require('../../assets/props/clouds.png')}
          style={{ width, height }}
          resizeMode="stretch"
        />
      </Animated.View>
    </View>
  );
}
