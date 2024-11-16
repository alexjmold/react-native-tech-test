import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";

import { CocktailSearchResult } from "@/types";
import { useTheme } from "../providers/ThemeProvider";
import CocktailDisplayType from "../shared/CocktailDisplayType";
import BackButton from "../shared/BackButton";
import CocktailIngredients from "../shared/CocktailIngredients";
import DisplayPill from "../shared/DisplayPill";
import CocktailInstructions from "../shared/CocktailInstructions";
import { useNavigation } from "expo-router";

interface CocktailDetailsScreenProps {
  cocktail: CocktailSearchResult;
}

const { width, height } = Dimensions.get("window");

export default function CocktailDetailScreen({
  cocktail,
}: CocktailDetailsScreenProps) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.lightPink }}>
      <ScrollView style={{ backgroundColor: colors.lightPink }}>
        <Image
          source={{ uri: cocktail.strDrinkThumb }}
          style={styles.headerImage}
        />
        <View
          style={{
            ...styles.contentContainer,
            backgroundColor: colors.lightPink,
          }}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{cocktail.strDrink}</Text>
              <View style={styles.tags}>
                <DisplayPill text={cocktail.strCategory} />
                <DisplayPill text={cocktail.strAlcoholic} />
              </View>
            </View>
            <CocktailDisplayType
              glass={cocktail.strGlass}
              category={cocktail.strCategory}
            />
          </View>
          <CocktailIngredients cocktail={cocktail} />
          <CocktailInstructions instructions={cocktail.strInstructions} />
          <Pressable
            style={{ ...styles.backToHome, backgroundColor: colors.darkPink }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backToHomeText}>Back to all cocktails</Text>
          </Pressable>
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
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  backToHome: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 50,
    borderRadius: 30,
  },
  backToHomeText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
