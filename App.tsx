import React, { useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Imported from the weight's own entry point: the package index pulls in all
// eighteen Inter weights, which is ~6MB of fonts we never render.
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { WelcomeScreen, type Provider } from "./src/screens/WelcomeScreen";

// Hold the native splash until the font is ready, so the headline never flashes
// in a fallback face.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_600SemiBold });

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
