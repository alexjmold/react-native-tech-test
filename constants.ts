import {
  LucideIcon,
  GlassWater,
  Martini,
  Coffee,
  Wine,
  Beer,
} from "lucide-react-native";
import { ApplicationThemeColors } from "./types";

export const glassIconMap: Record<string, LucideIcon> = {
  "shot-glass": GlassWater,
  "cocktail-glass": Martini,
  "coffee-mug": Coffee,
  "highball-glass": GlassWater,
  "collins-glass": GlassWater,
  "champagne-flute": Wine,
  "whiskey-sour-glass": GlassWater,
  "pint-glass": Beer,
  "hurricane-glass": Wine,
  default: Martini,
};

export const drinkTypeColorMap: Record<string, keyof ApplicationThemeColors> = {
  "ordinary-drink": "yellow",
  shot: "green",
  cocktail: "pink",
  default: "darkPink",
};
