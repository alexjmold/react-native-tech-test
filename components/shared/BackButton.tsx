import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { useTheme } from "../providers/ThemeProvider";

export default function BackButton() {
  const { colors } = useTheme();

  return (
    <Link href="/" asChild style={styles.container}>
      <Pressable
        style={{ ...styles.backButton, backgroundColor: colors.light }}
      >
        <ArrowLeft size={30} color={colors.dark} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
