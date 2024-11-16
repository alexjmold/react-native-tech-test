import { StyleSheet, View } from "react-native";
import DisplayPill from "./DisplayPill";

interface CocktailTagsProps {
  tags: string[];
}

export default function CocktailTags({ tags }: CocktailTagsProps) {
  return (
    <View style={styles.tags}>
      {tags.map((tag) => (
        <DisplayPill key={tag} text={tag} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tags: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
});
