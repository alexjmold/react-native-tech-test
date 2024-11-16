export interface ApplicationThemeColors {
  light: string;
  dark: string;
  lightPink: string;
  pink: string;
  darkPink: string;
  yellow: string;
  lightGrey: string;
  blue: string;
  green: string;
}

export interface ApplicationTheme {
  colors: ApplicationThemeColors;
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
