import { Text, StyleSheet, Pressable, Image, View } from "react-native";
import { ArrowRight } from "lucide-react-native";

import { CocktailSearchResult } from "@/types";
import { useTheme } from "../providers/ThemeProvider";

interface CocktailListItemProps {
  cocktail: CocktailSearchResult;
}

export default function CocktailListItem({ cocktail }: CocktailListItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={{ ...styles.pressable, backgroundColor: theme.colors.light }}
    >
      <Image
        source={{ uri: cocktail.strDrinkThumb }}
        style={{ ...styles.thumbnail, borderColor: theme.colors.lightGrey }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <Text numberOfLines={1} style={styles.description}>
          {cocktail.strInstructions}
        </Text>
        <Text style={{ ...styles.category, borderColor: theme.colors.dark }}>
          {cocktail.strCategory}
        </Text>
      </View>
      <View style={styles.arrow}>
        <ArrowRight color={theme.colors.dark} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
    borderRadius: 24,
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
  },
  description: {
    width: "auto",
    fontSize: 14,
    marginBottom: 10,
  },
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
  arrow: {
    width: 50,
    height: 50,
    backgroundColor: "#F43E69",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000",
  },
});
