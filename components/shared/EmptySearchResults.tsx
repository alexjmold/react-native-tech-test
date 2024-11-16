import { StyleSheet, Text, View } from "react-native";
import { Search } from "lucide-react-native";
import { useTheme } from "../providers/ThemeProvider";

export default function EmptySearchResults() {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.container}>
      <Search color={colors.darkPink} size={80} strokeWidth={1.3} />
      <Text style={{ ...styles.message, fontFamily: fonts.regular }}>
        No results
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 16,
  },
});
