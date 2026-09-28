import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Asset } from 'expo-asset';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fontAssets } from './src/theme/fonts';
import { PROPS } from './src/data/props';
import { CLOUDS } from './src/data/clouds';
import { WelcomeScreen, type Provider } from './src/screens/WelcomeScreen';

// Hold the native splash until Open Runde and every image are ready. Without
// this the entrance animation starts against a half-loaded screen and the props
// pop in one by one — very visible in Expo Go, where images are fetched from the
// dev server over the network rather than read from the bundle.
SplashScreen.preventAutoHideAsync().catch(() => {});

const IMAGES = [...PROPS.map((prop) => prop.source), ...CLOUDS.map((cloud) => cloud.source)];

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // A missing asset should not strand the user on the splash screen.
    Asset.loadAsync(IMAGES)
      .catch(() => {})
      .finally(() => setImagesLoaded(true));
  }, []);

  const ready = fontsLoaded && imagesLoaded;

  const onLayout = useCallback(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  const handleContinue = (provider: Provider) => {
    // Auth is not wired up yet — this is where the OAuth flow would start.
    console.log(`continue with ${provider}`);
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <WelcomeScreen onContinue={handleContinue} />
      </View>
    </SafeAreaProvider>
  );
}
