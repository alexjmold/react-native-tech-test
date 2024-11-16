import { CircleX } from "lucide-react-native";
import { View, StyleSheet, Text } from "react-native";

import { useTheme } from "../providers/ThemeProvider";

export default function ErrorScreen() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.errorMessageContainer}>
        <CircleX strokeWidth={1.3} color={colors.darkPink} size={100} />
        <Text style={styles.errorMessageText}>Oops! An error occurred</Text>
      </View>
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
  errorMessageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessageText: {
    fontSize: 24,
    marginTop: 16,
  },
});
