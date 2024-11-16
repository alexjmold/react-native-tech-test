import { Text, StyleSheet, Pressable, Image, View } from "react-native";
import { Link } from "expo-router";

import { CocktailSearchResult } from "@/types";
import { useTheme } from "../providers/ThemeProvider";
import CocktailDisplayType from "./CocktailDisplayType";
import DisplayPill from "./DisplayPill";
import { memo } from "react";

interface CocktailListItemProps {
  cocktail: CocktailSearchResult;
}

export function CocktailListItem({ cocktail }: CocktailListItemProps) {
  const { colors, fonts } = useTheme();

  return (
    <Link
      href={{
        pathname: "/[cocktail]",
        params: { cocktail: cocktail.idDrink },
      }}
      asChild
    >
      <Pressable
        style={{
          ...styles.pressable,
          backgroundColor: colors.light,
        }}
      >
        <View />
        <Image
          source={{ uri: cocktail.strDrinkThumb }}
          style={{ ...styles.thumbnail, borderColor: colors.dark }}
        />
        <View style={styles.contentContainer}>
          <Text style={{ ...styles.title, fontFamily: fonts.bold }}>
            {cocktail.strDrink}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...styles.description, fontFamily: fonts.regular }}
          >
            {cocktail.strInstructions}
          </Text>
          <DisplayPill text={cocktail.strCategory} />
        </View>
        <CocktailDisplayType
          glass={cocktail.strGlass}
          category={cocktail.strCategory}
        />
      </Pressable>
    </Link>
  );
}

// Memoise our list item to be more performant in a FlatList context
export default memo(CocktailListItem);

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
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
});
