import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import { CocktailSearchResult } from "@/types";
import { useTheme } from "../providers/ThemeProvider";
import CocktailDisplayType from "../shared/CocktailDisplayType";
import BackButton from "../shared/BackButton";
import CocktailIngredients from "../shared/CocktailIngredients";
import DisplayPill from "../shared/DisplayPill";
import CocktailInstructions from "../shared/CocktailInstructions";

interface CocktailDetailsScreenProps {
  cocktail: CocktailSearchResult;
}

const { width } = Dimensions.get("window");

export default function CocktailDetailScreen({
  cocktail,
}: CocktailDetailsScreenProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: cocktail.strDrinkThumb }}
          style={styles.headerImage}
        />
        <View
          style={{ ...styles.contentContainer, backgroundColor: colors.light }}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{cocktail.strDrink}</Text>
              <DisplayPill text={cocktail.strCategory} />
            </View>
            <CocktailDisplayType
              glass={cocktail.strGlass}
              category={cocktail.strCategory}
            />
          </View>
          <CocktailIngredients cocktail={cocktail} />
          <CocktailInstructions instructions={cocktail.strInstructions} />
        </View>
      </ScrollView>
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  headerImage: {
    width: width,
    height: width,
  },
  contentContainer: {
    padding: 16,
    borderRadius: 40,
    position: "relative",
    top: -100,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
