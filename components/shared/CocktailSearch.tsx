import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import { useState } from "react";
import { Search, XIcon } from "lucide-react-native";

interface CocktailSearch {
  onSearch: (value: string) => Promise<void>;
  onClear: () => void;
  showClear: boolean;
}

export default function CocktailSearch({
  onSearch,
  onClear,
  showClear,
}: CocktailSearch) {
  const [search, setSearch] = useState("");
  const { colors, fonts } = useTheme();

  const handleOnClear = () => {
    setSearch("");
    onClear();
  };

  return (
    <View style={styles.searchInputContainer}>
      <TextInput
        style={{
          ...styles.searchInput,
          backgroundColor: colors.light,
          fontFamily: fonts.regular,
        }}
        value={search}
        placeholder="Search for a cocktail..."
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
        onChangeText={setSearch}
        returnKeyType="search"
        onSubmitEditing={() => onSearch(search)}
      />
      <Pressable
        onPress={() => onSearch(search)}
        style={{ ...styles.searchButton, backgroundColor: colors.darkPink }}
      >
        <Search color={colors.light} />
      </Pressable>
      {showClear && (
        <View style={styles.clearSearchButtonContainer}>
          <Pressable
            onPress={handleOnClear}
            style={{
              ...styles.clearSearchButton,
              backgroundColor: colors.darkPink,
            }}
          >
            <XIcon color={colors.light} size={20} />
            <Text style={{ fontFamily: fonts.bold, color: colors.light }}>
              Clear search
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    position: "relative",
  },
  searchInput: {
    height: 45,
    borderRadius: 20,
    margin: 12,
    fontSize: 18,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  searchButton: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 50,
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clearSearchButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  clearSearchButton: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 20,
    marginBottom: 6,
  },
});
