import { Martini } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

// Displays an animated martini glass as a loading indicator
export default function LoadingScreen() {
  const { colors } = useTheme();

  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 450 }),
        withTiming(-20, { duration: 450 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    ...styles.iconContainer,
    backgroundColor: colors.darkPink,
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Martini size={110} strokeWidth={1.3} color={colors.dark} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
