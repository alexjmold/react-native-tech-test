import { CocktailSearchResult } from "@/types";

export const getListedCocktailItems = (
  cocktail: CocktailSearchResult,
  itemKey: "strMeasure" | "strIngredient"
) => {
  return Object.keys(cocktail)
    .filter((key) => key.startsWith(itemKey))
    .map((key) => cocktail[key as keyof CocktailSearchResult])
    .filter((value) => !!value);
};

export const getCocktailIngredients = (cocktail: CocktailSearchResult) => {
  const ingredients = getListedCocktailItems(cocktail, "strIngredient");
  const measures = getListedCocktailItems(cocktail, "strMeasure");

  return ingredients.map((ingredient, index) => {
    const sanitisedingredient = ingredient ? ingredient.trim() : "";
    const sanitisedMeasure = measures[index] ? measures[index].trim() : "";

    if (sanitisedMeasure) {
      return `${sanitisedMeasure} ${sanitisedingredient}`;
    }

    return sanitisedingredient;
  });
};
