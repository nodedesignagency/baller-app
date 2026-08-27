import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { badge } from "../theme/tokens";
import { GoalBoltGlyph } from "./icons/GoalBoltGlyph";
import { sine, sineAround, useLoop } from "../hooks/useMotion";

type Props = { animate: boolean };

/** How far past the disc the "live" ring travels before it fades out. */
const PING_SCALE = 1.85;
const GLOW_SPREAD = 2.2;

/**
 * The glass disc at the centre of the frame. It scales in with a little
 * overshoot, breathes, and pushes out a slow ring — the screen's one nod to
 * the product being live.
 */
export function BrandBadge({ animate }: Props) {
  const entrance = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const ping = useRef(new Animated.Value(0)).current;
  const breath = useLoop(4200, animate);

  useEffect(() => {
    if (!animate) {
      entrance.setValue(1);
      return;
    }
    const animation = Animated.spring(entrance, {
      toValue: 1,
      delay: 260,
      damping: 11,
      stiffness: 120,
      mass: 1,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [entrance, animate]);

  useEffect(() => {
    if (!animate) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(900),
        Animated.timing(ping, {
          toValue: 1,
          duration: 2600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(ping, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [ping, animate]);

  const glowSize = badge.size * GLOW_SPREAD;

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        width: badge.size,
        height: badge.size,
        alignItems: "center",
        justifyContent: "center",
        opacity: entrance.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1, 1],
        }),
        transform: [
          {
            scale: entrance.interpolate({
              inputRange: [0, 1],
              outputRange: [0.4, 1],
            }),
          },
          { translateY: sine(breath, 2.5, 0) },
        ],
      }}
    >
      {/* Halo bleeding out past the disc. */}
      <View
        style={[
          styles.centred,
          {
            width: glowSize,
            height: glowSize,
            left: (badge.size - glowSize) / 2,
            top: (badge.size - glowSize) / 2,
          },
        ]}
      >
        <Svg width={glowSize} height={glowSize} viewBox="0 0 100 100">
          <Defs>
            <RadialGradient id="badgeHalo" cx="50%" cy="50%" r="50%">
              <Stop offset={0} stopColor="#FFFFFF" stopOpacity={0.28} />
              <Stop offset={0.45} stopColor="#FFFFFF" stopOpacity={0.12} />
              <Stop offset={1} stopColor="#FFFFFF" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={50} cy={50} r={50} fill="url(#badgeHalo)" />
        </Svg>
      </View>

      {/* Expanding "live" ring. */}
      <Animated.View
        style={[
          styles.centred,
          {
            width: badge.size,
            height: badge.size,
            opacity: ping.interpolate({
              inputRange: [0, 0.15, 1],
              outputRange: [0, 0.4, 0],
            }),
            transform: [
              {
                scale: ping.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, PING_SCALE],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.disc, styles.ring]} />
      </Animated.View>

      <View style={[styles.disc, styles.glass]} />
      <Animated.View
        style={{ transform: [{ scale: sineAround(breath, 1, 0.02, 0.25) }] }}
      >
        <GoalBoltGlyph size={badge.glyphSize} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  centred: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  disc: {
    position: "absolute",
    width: badge.size,
    height: badge.size,
    borderRadius: badge.size / 2,
  },
  glass: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  ring: { borderWidth: 1.5, borderColor: "rgba(255,255,255,0.7)" },
});
