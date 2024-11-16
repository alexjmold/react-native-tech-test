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
import CocktailInstructions from "../shared/CocktailInstructions";
import { useNavigation } from "expo-router";
import CocktailTags from "../shared/CocktailTags";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react-native";

interface CocktailDetailsScreenProps {
  cocktail: CocktailSearchResult;
}

const { width } = Dimensions.get("window");

const contentOffset = width - 50;

export default function CocktailDetailScreen({
  cocktail,
}: CocktailDetailsScreenProps) {
  const { colors, fonts } = useTheme();
  const navigation = useNavigation();

  const tags = useMemo(() => {
    const { strCategory, strTags } = cocktail;

    if (!strTags) {
      return [strCategory];
    }

    const splitTags = strTags.split(",");
    return [strCategory, ...splitTags].filter((tag) => !!tag);
  }, [cocktail]);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.lightPink }}>
      <Image
        source={{ uri: cocktail.strDrinkThumb }}
        style={styles.headerImage}
      />
      <ScrollView
        style={{ paddingTop: contentOffset }}
        contentContainerStyle={{
          ...styles.contentContainer,
          backgroundColor: colors.lightPink,
          flexGrow: 1,
        }}
      >
        <View style={{ ...styles.header, borderBottomColor: colors.pink }}>
          <View style={styles.headerContent}>
            <Text
              style={{
                ...styles.title,
                maxWidth: width - 80,
                fontFamily: fonts.bold,
              }}
            >
              {cocktail.strDrink}
            </Text>
            <CocktailDisplayType
              glass={cocktail.strGlass}
              category={cocktail.strCategory}
            />
          </View>
          <CocktailTags tags={tags} />
          <Text
            style={{
              ...styles.alcoholTag,
              color: colors.darkPink,
              fontFamily: fonts.bold,
            }}
          >
            {cocktail.strAlcoholic}
          </Text>
        </View>
        <CocktailIngredients cocktail={cocktail} />
        <CocktailInstructions instructions={cocktail.strInstructions} />
        <Pressable
          style={{
            ...styles.backToHome,
            backgroundColor: colors.darkPink,
          }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={colors.light} size={25} />
          <Text
            style={{
              ...styles.backToHomeText,
              color: colors.light,
              fontFamily: fonts.bold,
            }}
          >
            Back to all cocktails
          </Text>
        </Pressable>
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
    position: "absolute",
    top: 0,
    left: 0,
  },
  contentContainer: {
    padding: 16,
    borderRadius: 40,
    position: "relative",
    paddingBottom: 50,
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  headerContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backToHome: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 50,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  backToHomeText: {
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  alcoholTag: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: "bold",
  },
});
