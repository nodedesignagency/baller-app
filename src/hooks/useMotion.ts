import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing } from "react-native";

/** Number of interpolation stops used to approximate a sine curve. */
const SINE_STEPS = 24;

/**
 * A value that cycles 0 -> 1 forever at a constant rate. Feed it to `sine` or
 * `sineDeg` to get a smooth, seamless oscillation on the UI thread.
 */
export function useLoop(duration: number, enabled = true) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!enabled) {
      value.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [value, duration, enabled]);

  return value;
}

function sineRanges(amplitude: number, phase: number) {
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  for (let i = 0; i <= SINE_STEPS; i += 1) {
    const t = i / SINE_STEPS;
    inputRange.push(t);
    outputRange.push(Math.sin((t + phase) * Math.PI * 2) * amplitude);
  }
  return { inputRange, outputRange };
}

/** Maps a looping 0..1 value onto a sine wave of the given amplitude. */
export function sine(value: Animated.Value, amplitude: number, phase = 0) {
  return value.interpolate(sineRanges(amplitude, phase));
}

/** Same as `sine`, but produces a rotation string for `transform`. */
export function sineDeg(value: Animated.Value, degrees: number, phase = 0) {
  const { inputRange, outputRange } = sineRanges(degrees, phase);
  return value.interpolate({
    inputRange,
    outputRange: outputRange.map((d) => `${d.toFixed(3)}deg`),
  });
}

/** Tracks the OS "reduce motion" setting so we can hold the screen still. */
export function useReduceMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (active) setReduced(value);
    });
    const sub = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduced,
    );
    return () => {
      active = false;
      sub.remove();
    };
  }, []);

  return reduced;
}

/** A sine that oscillates around `center` rather than around zero. */
export function sineAround(
  value: Animated.Value,
  center: number,
  amplitude: number,
  phase = 0,
) {
  const { inputRange, outputRange } = sineRanges(amplitude, phase);
  return value.interpolate({
    inputRange,
    outputRange: outputRange.map((v) => center + v),
  });
}
