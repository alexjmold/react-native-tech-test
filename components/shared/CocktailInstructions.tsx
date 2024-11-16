import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

interface CocktailInstructionsProps {
  instructions: string;
}

export default function CocktailInstructions({
  instructions,
}: CocktailInstructionsProps) {
  const { fonts } = useTheme();

  return (
    <View>
      <Text style={{ ...styles.title, fontFamily: fonts.bold }}>
        How to make 🧑‍🍳
      </Text>
      <Text style={{ ...styles.instructions, fontFamily: fonts.regular }}>
        {instructions}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 25,
  },
});
