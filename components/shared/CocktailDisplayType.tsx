import { glassIconMap } from "@/constants";
import { getDrinkTypeColor, stringToReference } from "@/utils/cocktail-display";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

interface CocktailDisplayTypeProps {
  glass: string;
  category: string;
}

/**
 * Displays an icon from the cocktail glass type and a colour from the category
 */
export default function CocktailDisplayType({
  glass,
  category,
}: CocktailDisplayTypeProps) {
  const theme = useTheme();

  const glassIconReference = stringToReference(glass);
  const categoryReference = stringToReference(category);

  const Icon = glassIconMap[glassIconReference] || glassIconMap.default;
  const backgroundColor = getDrinkTypeColor({
    type: categoryReference,
    colors: theme.colors,
  });

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <Icon
        style={styles.icon}
        color={theme.colors.dark}
        size={50}
        strokeWidth={1.3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  icon: {
    transform: [
      {
        rotate: "10deg",
      },
    ],
  },
});
