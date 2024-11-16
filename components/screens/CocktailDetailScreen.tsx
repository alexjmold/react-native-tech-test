import { CocktailSearchResult } from "@/types";
import { Text, SafeAreaView } from "react-native";

interface CocktailDetailsScreenProps {
  cocktail: CocktailSearchResult;
}

export default function CocktailDetailScreen({
  cocktail,
}: CocktailDetailsScreenProps) {
  return (
    <SafeAreaView>
      <Text>{cocktail.strDrink}</Text>
    </SafeAreaView>
  );
}
