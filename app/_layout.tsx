import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  Lexend_400Regular,
  Lexend_800ExtraBold,
} from "@expo-google-fonts/lexend";
import { useFonts } from "expo-font";

import { CocktailTheme } from "@/theme";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lexend_400Regular,
    Lexend_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <ThemeProvider theme={CocktailTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          fullScreenGestureEnabled: true,
        }}
      />
    </ThemeProvider>
  );
}
