import axios from "axios";

import {
  COCKTAIL_DETAILS_ENDPOINT,
  COCKTAIL_SEARCH_ENDPOINT,
  RANDOM_COCKTAIL_ENDPOINT,
} from "./constants";
import { CocktailSearchResult } from "@/types";

const FETCH_COUNT = 10;

// Delay response to show loading states
const delayResponse = () => new Promise((resolve) => setTimeout(resolve, 1000));

/**
 * Fetch random cocktails from the API endpoint and merge
 * these with any existing cocktails provided
 */
export const fetchRandomCocktails = async (
  existingCocktails?: CocktailSearchResult[]
) => {
  try {
    // Create an array of requests to fetch random cocktails
    const cocktailPromises = Array.from({ length: FETCH_COUNT }).map(() =>
      axios.get(RANDOM_COCKTAIL_ENDPOINT)
    );

    const responses: { data: { drinks: CocktailSearchResult[] } }[] =
      await Promise.all(cocktailPromises);

    // Map our responses into an array of valid cocktails
    const newCocktails = responses
      .map(({ data }) => {
        const [randomDrink] = data.drinks;
        return randomDrink || null;
      })
      .filter((cocktail) => !!cocktail);

    const allCocktails = existingCocktails
      ? [...existingCocktails, ...newCocktails]
      : newCocktails;

    // Ensure we have all unique cocktails
    const uniqueCocktailIds = Array.from(
      new Set(allCocktails.map(({ idDrink }) => idDrink))
    );

    const uniqueCocktails = uniqueCocktailIds
      .map((uniqueId) => {
        return allCocktails.find(({ idDrink }) => uniqueId === idDrink);
      })
      .filter((cocktail) => !!cocktail);

    await delayResponse();

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

    const [cocktail] = response.data.drinks;

    if (!cocktail) {
      throw new Error("No drink data available");
    }

    return { data: cocktail };
  } catch {
    return { error: "Error retrieving cocktail" };
  }
};

// Get cocktails by search term
export const searchCocktails = async (value: string) => {
  try {
    const searchUrl = `${COCKTAIL_SEARCH_ENDPOINT}?s=${value}`;

    const response = await axios.get(searchUrl);

    const { drinks } = response.data;

    await delayResponse();

    return {
      data: drinks || [],
    };
  } catch {
    return { error: "Failed to search results" };
  }
};
