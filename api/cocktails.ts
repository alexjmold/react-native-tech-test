import axios from "axios";

import {
  COCKTAIL_DETAILS_ENDPOINT,
  RANDOM_COCKTAIL_ENDPOINT,
} from "./constants";
import { CocktailSearchResult } from "@/types";

// Fetch a set amount of random drinks
export const fetchRandomCocktails = async (count = 10) => {
  try {
    // Create an array of requests to fetch random cocktails
    const cocktailPromises = Array.from({ length: count }).map(() =>
      axios.get(RANDOM_COCKTAIL_ENDPOINT)
    );

    const responses: { data: { drinks: CocktailSearchResult[] } }[] =
      await Promise.all(cocktailPromises);

    // Map our responses into an array of valid cocktails
    const allCocktails = responses
      .map(({ data }) => {
        const [randomDrink] = data.drinks;
        return randomDrink || null;
      })
      .filter((cocktail) => !!cocktail);

    // Ensure we have all unique cocktails
    const uniqueCocktailIds = Array.from(
      new Set(allCocktails.map(({ idDrink }) => idDrink))
    );

    const uniqueCocktails = uniqueCocktailIds
      .map((uniqueId) => {
        return allCocktails.find(({ idDrink }) => uniqueId === idDrink);
      })
      .filter((cocktail) => !!cocktail);

    return { data: uniqueCocktails };
  } catch {
    return { error: "Error getting cocktails" };
  }
};

// Fetch the details for a single cocktail by ID
export const fetchCocktailDetails = async (
  id: string
): Promise<{ error?: string; data?: CocktailSearchResult }> => {
  try {
    if (!id) {
      throw new Error("No cocktail ID was specified.");
    }

    const cocktailDetailUrl = `${COCKTAIL_DETAILS_ENDPOINT}?i=${id}`;

    const response = await axios.get(cocktailDetailUrl);

    const [drinkData] = response.data.drinks;

    if (!drinkData) {
      throw new Error("No drink data available");
    }

    return { data: drinkData };
  } catch {
    return { error: "Error retrieving cocktail" };
  }
};
