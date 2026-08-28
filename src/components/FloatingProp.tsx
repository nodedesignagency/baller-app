import React, { useEffect, useRef } from 'react';
import { Animated, Image } from 'react-native';
import type { PropSpec } from '../data/props';
import { sine, sineDeg, useLoop } from '../hooks/useMotion';

type Props = {
  spec: PropSpec;
  screenWidth: number;
  screenHeight: number;
  /** Shared tilt offset; each prop takes a share of it based on its depth. */
  tilt: Animated.ValueXY;
  animate: boolean;
};

/** Delay before the first prop flies in, in ms. */
const ENTRANCE_DELAY = 120;
/** Extra delay per prop in the stagger. */
const ENTRANCE_STAGGER = 65;

/**
 * One 3D prop. It springs in from off-frame, then breathes on a slow sine of
 * its own and leans with the handset.
 */
export function FloatingProp({ spec, screenWidth, screenHeight, tilt, animate }: Props) {
  const entrance = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const float = useLoop(spec.float.duration, animate);
  const sway = useLoop(spec.sway.duration, animate);

  useEffect(() => {
    if (!animate) {
      entrance.setValue(1);
      return;
    }
    const animation = Animated.spring(entrance, {
      toValue: 1,
      delay: ENTRANCE_DELAY + spec.order * ENTRANCE_STAGGER,
      damping: 14,
      stiffness: 90,
      mass: 1,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [entrance, animate, spec.order]);

  const width = screenWidth * spec.width;
  const height = width / spec.aspect;

  const enter = (to: number) =>
    entrance.interpolate({ inputRange: [0, 1], outputRange: [to, 0] });

  const translateX = Animated.add(enter(spec.entry.x), Animated.multiply(tilt.x, spec.depth));
  const translateY = Animated.add(
    Animated.add(enter(spec.entry.y), Animated.multiply(tilt.y, spec.depth)),
    sine(float, spec.float.amplitude, spec.float.phase),
  );

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: screenWidth * spec.left + spec.bleed.x,
        top: screenHeight * spec.top + spec.bleed.y,
        width,
        height,
        opacity: entrance.interpolate({
          inputRange: [0, 0.45, 1],
          outputRange: [0, 1, 1],
        }),
        transform: [
          { translateX },
          { translateY },
          {
            rotate: entrance.interpolate({
              inputRange: [0, 1],
              outputRange: [`${spec.entry.rotate}deg`, '0deg'],
            }),
          },
          { rotate: sineDeg(sway, spec.sway.degrees, spec.sway.phase) },
          {
            scale: entrance.interpolate({
              inputRange: [0, 1],
              outputRange: [0.86, 1],
            }),
          },
        ],
      }}
    >
      <Image source={spec.source} style={{ width, height }} resizeMode="contain" />
    </Animated.View>
  );
}
