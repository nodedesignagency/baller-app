import { useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import { DeviceMotion } from "expo-sensors";

/** How far, in dp, a depth-1.0 prop shifts at full tilt. */
const TRAVEL = 14;
/** Tilt angle (radians) treated as the end of the range. */
const RANGE = 0.6;
/** Exponential smoothing factor applied to raw sensor samples. */
const SMOOTHING = 0.12;

const clamp = (n: number, limit: number) =>
  Math.max(-limit, Math.min(limit, n));

/**
 * Returns an x/y offset that follows how the handset is being held, so the
 * props sit at slightly different depths as the phone moves. Resolves to a
 * still value on devices without motion sensors.
 */
export function useTiltParallax(enabled = true) {
  const offset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    // Web has no reliable motion sensor without a permission prompt, and the
    // module throws when the listener is attached there.
    if (!enabled || Platform.OS === "web") {
      offset.setValue({ x: 0, y: 0 });
      return;
    }

    let subscription: { remove: () => void } | undefined;
    let cancelled = false;
    let x = 0;
    let y = 0;

    DeviceMotion.isAvailableAsync()
      .then((available) => {
        if (!available || cancelled) return;

        DeviceMotion.setUpdateInterval(50);
        subscription = DeviceMotion.addListener(({ rotation }) => {
          if (!rotation) return;
          // gamma: roll (left/right), beta: pitch (front/back).
          const targetX = clamp(rotation.gamma / RANGE, 1) * TRAVEL;
          const targetY = clamp(rotation.beta / RANGE, 1) * TRAVEL;
          x += (targetX - x) * SMOOTHING;
          y += (targetY - y) * SMOOTHING;
          offset.setValue({ x, y });
        });
      })
      // No sensor, or the platform refused it: the props simply hold still.
      .catch(() => {});

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [offset, enabled]);

  return offset;
}
