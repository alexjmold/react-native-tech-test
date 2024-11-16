import { View, Text, StyleSheet } from "react-native";

import { CocktailSearchResult } from "@/types";
import { getCocktailIngredients } from "@/utils/cocktail-data";
import { ArrowRight } from "lucide-react-native";
import { useTheme } from "../providers/ThemeProvider";

interface CocktailIngredients {
  cocktail: CocktailSearchResult;
}

export default function CocktailIngredients({ cocktail }: CocktailIngredients) {
  const { colors } = useTheme();
  const ingredients = getCocktailIngredients(cocktail);

  return (
    <View style={{ ...styles.container, borderBottomColor: colors.pink }}>
      <Text style={styles.title}>Ingredients 🍉</Text>
      <View style={styles.listContainer}>
        {ingredients.map(({ ingredient, measure }) => (
          <View key={`${ingredient}-${measure}`} style={styles.listItem}>
            <View
              style={{ ...styles.arrowContainer, backgroundColor: colors.pink }}
            >
              <ArrowRight color={colors.dark} size={25} />
            </View>
            <Text style={styles.listText}>
              {measure && <Text>{measure}</Text>}
              {ingredient}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  listText: {
    fontSize: 18,
    marginBottom: 8,
    position: "relative",
    top: 3,
  },
  arrowContainer: {
    borderRadius: 50,
    width: 25,
    height: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
