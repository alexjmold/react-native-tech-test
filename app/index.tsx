import { View, Text } from "react-native";
import { useState } from "react";

import IntroScreen from "@/components/screens/IntroScreen";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Index() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showIntro ? (
        <Animated.View exiting={FadeOut}>
          <IntroScreen onAnimationComplete={() => setShowIntro(false)} />
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn}>
          <Text>Welcome!</Text>
        </Animated.View>
      )}
    </View>
  );
}
