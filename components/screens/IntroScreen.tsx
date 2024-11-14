import { StyleSheet, View, Dimensions } from "react-native";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { Martini } from "lucide-react-native";
import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const WAVE_HEIGHT = 50;
const ANIMATION_DURATION = 5000; // Duration of the entire animation
const END_POSITION = -100; // End position for the top of the wave wanimation
const WAVE_PATH_COLOUR = "#f76f8e";

interface IntroScreenProps {
  onAnimationComplete: () => void;
}

/**
 * Liquid animation that rises on load
 */
export default function IntroScreen({ onAnimationComplete }: IntroScreenProps) {
  const waveLength = width * 2;
  const waveOffset = useSharedValue(0);
  const martiniY = useSharedValue(100);
  const martiniOpacity = useSharedValue(0);
  const waveHeightOffset = useSharedValue(height - height / 3);
  const containerY = useSharedValue(0);

  const martiniStyles = useAnimatedStyle(() => ({
    opacity: martiniOpacity.value,
    transform: [{ translateY: martiniY.value }],
  }));

  const containerStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: containerY.value }],
  }));

  useEffect(() => {
    // Start wave animation
    waveOffset.value = withTiming(waveLength * 8.5, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.sin),
    });

    // Start height animation
    waveHeightOffset.value = withTiming(END_POSITION, {
      duration: ANIMATION_DURATION,
    });

    // Martin icon animations
    martiniOpacity.value = withDelay(
      2000,
      withSequence(
        withTiming(1, { duration: 700, easing: Easing.out(Easing.sin) }),
        withDelay(
          1000,
          withTiming(0, { duration: 700, easing: Easing.out(Easing.sin) })
        )
      )
    );

    martiniY.value = withDelay(
      2000,
      withSequence(
        withTiming(0, { duration: 700, easing: Easing.out(Easing.sin) }),
        withDelay(
          1000,
          withTiming(-300, { duration: 700, easing: Easing.in(Easing.sin) })
        )
      )
    );

    containerY.value = withDelay(
      4000,
      withTiming(-height, { duration: 1000, easing: Easing.in(Easing.sin) })
    );

    setTimeout(() => {
      onAnimationComplete();
    }, 5500);
  }, []);

  const wavePath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    path.moveTo(0, waveHeightOffset.value / 2);

    // Create wave path by calculating the corresponding y position
    // based on a sine function at each pixel (x position)
    for (let x = 0; x < width; x += 1) {
      const y =
        Math.sin(
          ((x + waveOffset.value) % waveLength) * ((2 * Math.PI) / waveLength)
        ) *
          WAVE_HEIGHT +
        waveHeightOffset.value;
      path.lineTo(x, y);
    }

    path.lineTo(width, height);
    path.lineTo(0, height);
    path.close();
    return path;
  }, [waveOffset]);

  return (
    <Animated.View style={{ ...styles.container, ...containerStyles }}>
      <Canvas style={{ width, height }}>
        <Path path={wavePath} color={WAVE_PATH_COLOUR} />
      </Canvas>
      <View style={styles.textContainer}>
        <Animated.View style={martiniStyles}>
          <Martini color="white" size={120} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
