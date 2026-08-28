import React, { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fontAssets } from './src/theme/fonts';
import { WelcomeScreen, type Provider } from './src/screens/WelcomeScreen';

// Hold the native splash until Open Runde is ready, so the headline never
// flashes in a fallback face.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);

  const onLayout = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

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
