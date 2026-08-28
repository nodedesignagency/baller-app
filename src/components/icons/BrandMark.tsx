import React from 'react';
import { Image } from 'react-native';

/**
 * Baller's mark — the goal, net, two balls and lightning bolt — rendered from
 * the artboard's own export rather than redrawn.
 */
export function BrandMark({ size }: { size: number }) {
  return (
    <Image
      source={require('../../../assets/props/mark.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}
