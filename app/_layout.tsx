import { Stack } from "expo-router";

import { CocktailTheme } from "@/theme";
import ThemeProvider from "@/components/providers/ThemeProvider";

export default function RootLayout() {
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
