import { fetchRandomCocktails } from "@/api/cocktails";
import { CocktailSearchResult } from "@/types";
import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import CocktailListItem from "../shared/CocktailListItem";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

const MAX_REQUESTS = 3;

/**
 * Loads and displays all cocktail list items
 */
export default function CocktailListScreen() {
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cocktails, setCocktails] = useState<CocktailSearchResult[]>([]);

  const loadCocktails = async () => {
    try {
      if (requestCount > MAX_REQUESTS) {
        return;
      }

      const { error, data } = await fetchRandomCocktails(cocktails);

      if (error || !data) {
        throw new Error(error);
      }

      setCocktails((existingCocktails) => [...existingCocktails, ...data]);
      setRequestCount((count) => count + 1);
    } catch {
      setError(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    loadCocktails();
  }, []);

  if (loading && requestCount === 0) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>Cocktails</Text>
      <FlatList
        data={cocktails}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CocktailListItem key={item.idDrink} cocktail={item} />
        )}
        onEndReached={loadCocktails}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() =>
          requestCount > MAX_REQUESTS ? (
            <Text style={styles.endOfResults}>End of results</Text>
          ) : (
            <LoadingScreen size="small" />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    padding: 16,
  },
  listContainer: {
    paddingBottom: 32,
  },
  list: {
    flex: 1,
    padding: 16,
  },
  endOfResults: {
    textAlign: "center",
    fontSize: 16,
  },
});
