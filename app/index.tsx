import { View, StyleSheet } from "react-native";
import { useState } from "react";

import IntroScreen from "@/components/screens/IntroScreen";
import Animated, { FadeIn } from "react-native-reanimated";
import CocktailListScreen from "@/components/screens/CocktailListScreen";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.lightPink }}>
      {showIntro ? (
        <IntroScreen onAnimationComplete={() => setShowIntro(false)} />
      ) : (
        <Animated.View entering={FadeIn} style={styles.container}>
          <CocktailListScreen />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
