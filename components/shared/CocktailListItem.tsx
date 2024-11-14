import { Text, StyleSheet, Pressable, Image, View } from "react-native";

import { CocktailSearchResult } from "@/types";

interface CocktailListItemProps {
  cocktail: CocktailSearchResult;
}

export default function CocktailListItem({ cocktail }: CocktailListItemProps) {
  return (
    <Pressable style={styles.pressable}>
      <Image
        source={{ uri: cocktail.strDrinkThumb }}
        style={styles.thumbnail}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <Text numberOfLines={1} style={styles.description}>
          {cocktail.strInstructions}
        </Text>
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
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    gap: 24,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    width: "auto",
  },
});
