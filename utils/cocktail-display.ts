import { drinkTypeColorMap } from "@/constants";
import { ApplicationTheme, ApplicationThemeColors } from "@/types";

// Return a reference we can use based off of a cocktail attribute such as its category or glass type
export const stringToReference = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Return a colour based off of the type of a cocktial available within our theme
export const getDrinkTypeColor = ({
  type,
  colors,
}: {
  type: string;
  colors: ApplicationThemeColors;
}) => {
  const colorReference = drinkTypeColorMap[type] || drinkTypeColorMap.default;
  return colors[colorReference];
};
