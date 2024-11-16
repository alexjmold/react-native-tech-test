import { Text, StyleSheet, Pressable, Image, View } from "react-native";

import { CocktailSearchResult } from "@/types";
import { useTheme } from "../providers/ThemeProvider";
import CocktailDisplayType from "./CocktailDisplayType";
import { Link } from "expo-router";
import DisplayPill from "./DisplayPill";

interface CocktailListItemProps {
  cocktail: CocktailSearchResult;
}

export default function CocktailListItem({ cocktail }: CocktailListItemProps) {
  const theme = useTheme();

  return (
    <Link
      href={{
        pathname: "/[cocktail]",
        params: { cocktail: cocktail.idDrink },
      }}
      asChild
    >
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
});
