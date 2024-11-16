import { View, Text, StyleSheet } from "react-native";

interface CocktailInstructionsProps {
  instructions: string;
}

export default function CocktailInstructions({
  instructions,
}: CocktailInstructionsProps) {
  return (
    <View>
      <Text style={styles.title}>How to make 🧑‍🍳</Text>
      <Text style={styles.instructions}>{instructions}</Text>
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
