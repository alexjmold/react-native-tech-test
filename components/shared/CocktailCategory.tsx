import { StyleSheet, Text } from "react-native";

import { useTheme } from "../providers/ThemeProvider";

interface CocktailCategoryProps {
  category: string;
}

export default function CocktailCategory({ category }: CocktailCategoryProps) {
  const { colors } = useTheme();

  return (
    <Text style={{ ...styles.category, borderColor: colors.dark }}>
      {category}
    </Text>
  );
}

const styles = StyleSheet.create({
  category: {
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
