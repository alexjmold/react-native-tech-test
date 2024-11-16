import { View, StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { fetchRandomCocktails } from "@/api/cocktails";
import { CocktailSearchResult } from "@/types";
import CocktailListItem from "../shared/CocktailListItem";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { useTheme } from "../providers/ThemeProvider";
import { Martini } from "lucide-react-native";

const MAX_REQUESTS = 3;

/**
 * Loads and displays all cocktail list items
 */
export default function CocktailListScreen() {
  const { colors, fonts } = useTheme();
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true); // Loading set on intial load to show full page loading screen
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
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCocktails();
  }, []);

  const listHeader = () => (
    <View style={styles.titleContainer}>
      <View
        style={{ ...styles.titleUnderline, backgroundColor: colors.pink }}
      />
      <Text style={{ ...styles.title, fontFamily: fonts.bold }}>Cocktails</Text>
    </View>
  );

  const listFooter = () => (
    <>
      {requestCount > MAX_REQUESTS ? (
        <Text style={{ ...styles.endOfResults, fontFamily: fonts.regular }}>
          End of results
        </Text>
      ) : (
        <LoadingScreen size="small" />
      )}
    </>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.backgroundIconContainer}>
        <Martini
          size={1000}
          style={{ ...styles.backgroundIcon }}
          color={colors.pink}
        />
      </View>
      <FlatList
        data={cocktails}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CocktailListItem key={item.idDrink} cocktail={item} />
        )}
        onEndReached={loadCocktails}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundIcon: {
    transform: [{ rotate: "20deg" }],
    opacity: 0.5,
  },
  safeAreaView: {
    flex: 1,
  },
  titleContainer: {
    position: "relative",
    padding: 16,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  titleUnderline: {
    height: 20,
    width: 330,
    position: "absolute",
    bottom: 22,
    left: 16,
    borderRadius: 30,
    transform: [{ rotate: "-2deg" }],
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
