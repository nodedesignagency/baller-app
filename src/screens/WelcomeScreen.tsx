import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PROPS } from '../data/props';
import { authButton, badge, colors, DESIGN, headline } from '../theme/tokens';
import { fonts } from '../theme/fonts';
import { useReduceMotion } from '../hooks/useMotion';
import { useTiltParallax } from '../hooks/useTiltParallax';
import { SkyBackdrop } from '../components/SkyBackdrop';
import { FloatingProp } from '../components/FloatingProp';
import { BrandBadge } from '../components/BrandBadge';
import { AuthButton } from '../components/AuthButton';

export type Provider = 'google' | 'apple';

type Props = { onContinue?: (provider: Provider) => void };

/** When the headline starts, relative to first paint. */
const HEADLINE_DELAY = 420;
const HEADLINE_STAGGER = 90;
const BUTTON_DELAY = 820;

/** Keeps type from getting silly on very small or very wide screens. */
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function WelcomeScreen({ onContinue }: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const reduceMotion = useReduceMotion();
  const animate = !reduceMotion;
  const tilt = useTiltParallax(animate);

  const scale = clamp(width / DESIGN.width, 0.84, 1.18);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <SkyBackdrop width={width} height={height} animate={animate} />

      {PROPS.map((spec) => (
        <FloatingProp
          key={spec.key}
          spec={spec}
          screenWidth={width}
          screenHeight={height}
          tilt={tilt}
          animate={animate}
        />
      ))}

      <View
        style={{
          position: 'absolute',
          left: width / 2 - (badge.size * scale) / 2,
          top: height * badge.cy - (badge.size * scale) / 2,
          transform: [{ scale }],
        }}
      >
        <BrandBadge animate={animate} />
      </View>

      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: height * headline.top,
        }}
      >
        {headline.lines.map((line, index) => (
          <HeadlineLine
            key={line}
            text={line}
            delay={HEADLINE_DELAY + index * HEADLINE_STAGGER}
            animate={animate}
            fontSize={headline.fontSize * scale}
            lineHeight={headline.lineHeight * scale}
          />
        ))}
      </View>

      <View
        style={{
          position: 'absolute',
          left: authButton.sideMargin,
          right: authButton.sideMargin,
          bottom: Math.max(insets.bottom, authButton.bottomInset),
        }}
      >
        <AuthButton
          variant="google"
          label="Continue with Google"
          onPress={() => onContinue?.('google')}
          delay={BUTTON_DELAY}
          animate={animate}
        />
        <View style={{ height: authButton.gap }} />
        <AuthButton
          variant="apple"
          label="Continue with Apple"
          onPress={() => onContinue?.('apple')}
          delay={BUTTON_DELAY + 90}
          animate={animate}
        />
      </View>
    </View>
  );
}

function HeadlineLine({
  text,
  delay,
  animate,
  fontSize,
  lineHeight,
}: {
  text: string;
  delay: number;
  animate: boolean;
  fontSize: number;
  lineHeight: number;
}) {
  const progress = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (!animate) {
      progress.setValue(1);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: 1,
      delay,
      duration: 620,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, delay, animate]);

  return (
    <Animated.Text
      style={[
        styles.headline,
        {
          fontSize,
          lineHeight,
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
              }),
            },
          ],
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.sky },
  headline: {
    color: colors.textOnSky,
    fontFamily: fonts.medium,
    textAlign: 'center',
    letterSpacing: headline.letterSpacing,
  },
});
