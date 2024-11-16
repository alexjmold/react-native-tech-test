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

export interface ApplicationFonts {
  regular: string;
  bold: string;
}

export interface ApplicationTheme {
  colors: ApplicationThemeColors;
  fonts: ApplicationFonts;
}

type MeasureKeys = `strMeasure${
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15}`;

export type CocktailMeasures = {
  [key in MeasureKeys]: string | null;
};

type IngredientKeys = `strIngredient${
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15}`;

export type CocktailIngredients = {
  [Key in IngredientKeys]: string | null;
};

export interface CocktailSearchResult
  extends CocktailMeasures,
    CocktailIngredients {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strTags: string;
}
