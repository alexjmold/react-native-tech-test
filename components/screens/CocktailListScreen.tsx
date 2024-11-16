import { fetchRandomCocktails } from "@/api/cocktails";
import { CocktailSearchResult } from "@/types";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, SafeAreaView, Text } from "react-native";
import CocktailListItem from "../shared/CocktailListItem";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

/**
 * Loads and displays all cocktail list items
 */
export default function CocktailListScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cocktails, setCocktails] = useState<CocktailSearchResult[]>([]);

  useEffect(() => {
    const loadCocktails = async () => {
      try {
        const { error, data } = await fetchRandomCocktails();

        if (error || !data) {
          throw new Error(error);
        }

        setCocktails(data);
      } catch {
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    loadCocktails();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

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
