import React from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colors, glow } from '../theme/tokens';
import { CLOUDS } from '../data/clouds';
import { sine, useLoop } from '../hooks/useMotion';

type Props = {
  width: number;
  height: number;
  /** Suppressed when the OS asks for reduced motion. */
  animate: boolean;
};

/**
 * The sky: a flat blue field, the soft radial glow the artboard puts behind the
 * headline, and the cloud sprites. Each cloud drifts on its own clock, which is
 * what keeps the sky from reading as a still image.
 */
export function SkyBackdrop({ width, height, animate }: Props) {
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

      {CLOUDS.map((cloud) => (
        <Cloud
          key={cloud.key}
          cloud={cloud}
          screenWidth={width}
          screenHeight={height}
          animate={animate}
        />
      ))}
    </View>
  );
}

function Cloud({
  cloud,
  screenWidth,
  screenHeight,
  animate,
}: {
  cloud: (typeof CLOUDS)[number];
  screenWidth: number;
  screenHeight: number;
  animate: boolean;
}) {
  const drift = useLoop(cloud.drift.duration, animate);
  const cloudWidth = screenWidth * cloud.width;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: screenWidth * cloud.left,
        top: screenHeight * cloud.top,
        width: cloudWidth,
        height: cloudWidth / cloud.aspect,
        opacity: cloud.opacity,
        transform: [
          { translateX: sine(drift, cloud.drift.x, cloud.drift.phase) },
          { translateY: sine(drift, cloud.drift.y, cloud.drift.phase + 0.25) },
          ...(cloud.flip ? [{ scaleX: -1 }] : []),
        ],
      }}
    >
      <Image
        source={cloud.source}
        style={{ width: '100%', height: '100%' }}
        resizeMode="stretch"
      />
    </Animated.View>
  );
}
