import { StyleSheet, Text } from "react-native";

import { useTheme } from "../providers/ThemeProvider";

interface CocktailCategoryProps {
  text: string;
}

export default function CocktailCategory({ text }: CocktailCategoryProps) {
  const { colors } = useTheme();

  return (
    <Text style={{ ...styles.text, borderColor: colors.dark }}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    letterSpacing: 1,
    fontSize: 11,
    borderRadius: 20,
    marginBottom: 5,
    flexShrink: 1,
    borderWidth: 1,
  },
});
