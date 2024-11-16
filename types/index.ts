export interface ApplicationTheme {
  colors: {
    light: string;
    dark: string;
    lightPink: string;
    darkPink: string;
    yellow: string;
    lightGrey: string;
  };
}

export interface CocktailSearchResult {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
}
