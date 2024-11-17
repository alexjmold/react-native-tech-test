import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { fetchRandomCocktails, searchCocktails } from "@/api/cocktails";
import { CocktailSearchResult } from "@/types";
import { Martini } from "lucide-react-native";
import { useTheme } from "../providers/ThemeProvider";
import CocktailListItem from "../shared/CocktailListItem";
import CocktailSearch from "../shared/CocktailSearch";
import EmptySearchResults from "../shared/EmptySearchResults";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";

const MAX_REQUESTS = 3;

/**
 * Loads and displays all cocktail list items
 */
export default function CocktailListScreen() {
  const { colors, fonts } = useTheme();
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true); // Loading set on intial load to show full page loading screen
  const [error, setError] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [randomCocktails, setRandomCocktails] = useState<
    CocktailSearchResult[]
  >([]);
  const [searchResultCocktails, setSearchResultCocktails] = useState<
    CocktailSearchResult[]
  >([]);

  const loadRandomCocktails = async () => {
    try {
      if (requestCount > MAX_REQUESTS || showSearchResults) {
        return;
      }

      const { error, data } = await fetchRandomCocktails(randomCocktails);

      if (error || !data) {
        throw new Error(error);
      }

      setRandomCocktails((existingCocktails) => [
        ...existingCocktails,
        ...data,
      ]);
      setRequestCount((count) => count + 1);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Call our search results endpoint
  const handleSearch = async (value: string) => {
    if (!value) {
      return;
    }

    setLoading(true);

    const { data, error } = await searchCocktails(value);

    if (error) {
      return;
    }

    setShowSearchResults(true);
    setSearchResultCocktails(data);
    setLoading(false);
  };

  const handleOnSearchClear = () => {
    setSearchResultCocktails([]);
    setShowSearchResults(false);
  };

  useEffect(() => {
    loadRandomCocktails();
  }, []);

  const listFooter = () => {
    if (showSearchResults && !searchResultCocktails.length) {
      return <EmptySearchResults />;
    }

    const isEndOfResults = requestCount > MAX_REQUESTS || showSearchResults;

    return (
      <View>
        {isEndOfResults ? (
          <Text style={{ ...styles.endOfResults, fontFamily: fonts.regular }}>
            End of results
          </Text>
        ) : (
          <LoadingScreen size="small" />
        )}
      </View>
    );
  };

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{ borderBottomColor: colors.darkPink, borderBottomWidth: 1 }}
      >
        <View style={styles.titleContainer}>
          <View
            style={{ ...styles.titleUnderline, backgroundColor: colors.pink }}
          />
          <Text style={{ ...styles.title, fontFamily: fonts.bold }}>
            Cocktails
          </Text>
        </View>
        <CocktailSearch
          onSearch={handleSearch}
          onClear={handleOnSearchClear}
          showClear={showSearchResults}
        />
      </View>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.backgroundIconContainer}>
            <Martini
              size={600}
              style={{ ...styles.backgroundIcon }}
              color={colors.pink}
            />
          </View>
          <FlatList
            data={showSearchResults ? searchResultCocktails : randomCocktails}
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <CocktailListItem key={item.idDrink} cocktail={item} />
            )}
            onEndReached={loadRandomCocktails}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={listFooter}
          />
        </View>
      )}
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
    opacity: 0.8,
    zIndex: -1,
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
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  endOfResults: {
    textAlign: "center",
    fontSize: 16,
  },
});
