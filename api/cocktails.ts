import axios from "axios";

import { RANDOM_COCKTAIL_ENDPOINT } from "./constants";
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
