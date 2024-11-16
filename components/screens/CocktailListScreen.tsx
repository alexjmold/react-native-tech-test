import { fetchRandomCocktails } from "@/api/cocktails";
import { CocktailSearchResult } from "@/types";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, SafeAreaView, Text } from "react-native";
import CocktailListItem from "../shared/CocktailListItem";

/**
 * Loads and displays all cocktail list items
 */
export default function CocktailListScreen() {
  const [cocktails, setCocktails] = useState<CocktailSearchResult[]>([]);

  useEffect(() => {
    const loadCocktails = async () => {
      const { error, data } = await fetchRandomCocktails();

      if (error || !data) {
        return;
      }

      setCocktails(data);
    };

    loadCocktails();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Cocktails</Text>
        {cocktails.map((cocktail) => (
          <CocktailListItem key={cocktail.idDrink} cocktail={cocktail} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    marginBottom: 28,
  },
});
