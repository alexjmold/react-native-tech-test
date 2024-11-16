import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import CocktailDetailScreen from "@/components/screens/CocktailDetailScreen";
import { fetchCocktailDetails } from "@/api/cocktails";
import { CocktailSearchResult } from "@/types";
import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import { View } from "react-native";

export default function CocktailPage() {
  const { cocktail } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [cocktailData, setCocktailData] = useState<CocktailSearchResult | null>(
    null
  );

  useEffect(() => {
    const loadCocktailData = async () => {
      try {
        const { error, data } = await fetchCocktailDetails(cocktail as string);
        setLoading(false);

        if (error || !data) {
          throw new Error(error);
        }

        setCocktailData(data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    loadCocktailData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      {cocktailData ? (
        <CocktailDetailScreen cocktail={cocktailData} />
      ) : (
        <ErrorScreen />
      )}
    </View>
  );
}
