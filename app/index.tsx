import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/components/providers/ThemeProvider";
import CocktailListScreen from "@/components/screens/CocktailListScreen";
import IntroScreen from "@/components/screens/IntroScreen";
import Animated, { FadeIn } from "react-native-reanimated";

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
