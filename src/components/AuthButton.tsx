import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { authButton, colors } from "../theme/tokens";
import { GoogleGlyph } from "./icons/GoogleGlyph";
import { AppleGlyph } from "./icons/AppleGlyph";

type Props = {
  variant: "google" | "apple";
  label: string;
  onPress: () => void;
  delay: number;
  animate: boolean;
};

/**
 * A full-width auth pill. The glyph is pinned to the left edge and the label is
 * centred across the whole pill, matching the artboard.
 */
export function AuthButton({ variant, label, onPress, delay, animate }: Props) {
  const entrance = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const press = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) {
      entrance.setValue(1);
      return;
    }
    const animation = Animated.timing(entrance, {
      toValue: 1,
      delay,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [entrance, delay, animate]);

  const setPressed = (pressed: boolean) => {
    Animated.spring(press, {
      toValue: pressed ? 1 : 0,
      damping: 18,
      stiffness: 320,
      useNativeDriver: true,
    }).start();
  };

  const isGoogle = variant === "google";

  return (
    <Animated.View
      style={{
        opacity: entrance,
        transform: [
          {
            translateY: entrance.interpolate({
              inputRange: [0, 1],
              outputRange: [26, 0],
            }),
          },
          {
            scale: press.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.972],
            }),
          },
        ],
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPressIn={() => {
          setPressed(true);
          if (Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
              () => {},
            );
          }
        }}
        onPressOut={() => setPressed(false)}
        onPress={onPress}
        style={[
          styles.pill,
          {
            backgroundColor: isGoogle
              ? colors.googleSurface
              : colors.appleSurface,
          },
        ]}
      >
        <View style={styles.glyph}>
          {isGoogle ? (
            <GoogleGlyph size={authButton.glyphSize} />
          ) : (
            <AppleGlyph size={authButton.glyphSize} color={colors.appleLabel} />
          )}
        </View>
        <Text
          style={[
            styles.label,
            { color: isGoogle ? colors.googleLabel : colors.appleLabel },
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: authButton.height,
    borderRadius: authButton.radius,
    justifyContent: "center",
    shadowColor: "#00344F",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  glyph: {
    position: "absolute",
    left: authButton.glyphInset,
    width: authButton.glyphSize,
    height: authButton.height,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    fontSize: authButton.labelSize,
    letterSpacing: -0.1,
  },
});
