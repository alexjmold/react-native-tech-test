import { useNavigation } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { useTheme } from "../providers/ThemeProvider";

export default function BackButton() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable
      style={{ ...styles.backButton, backgroundColor: colors.light }}
      onPress={() => navigation.goBack()}
    >
      <ArrowLeft size={30} color={colors.dark} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
