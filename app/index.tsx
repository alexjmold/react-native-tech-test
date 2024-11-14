import { View, StyleSheet } from "react-native";
import { useState } from "react";

import IntroScreen from "@/components/screens/IntroScreen";
import Animated, { FadeIn } from "react-native-reanimated";
import CocktailListScreen from "@/components/screens/CocktailListScreen";

export default function Index() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <View style={styles.container}>
      {showIntro ? (
        <IntroScreen onAnimationComplete={() => setShowIntro(false)} />
      ) : (
        <Animated.View entering={FadeIn}>
          <CocktailListScreen />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFEBEF",
    flex: 1,
  },
});
