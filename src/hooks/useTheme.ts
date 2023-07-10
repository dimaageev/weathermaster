import { COLORS_DARK, COLORS_LIGHT } from "@src/constants/colors";
import { useColorScheme } from "react-native";

const useTheme = () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "light" ? COLORS_LIGHT : COLORS_DARK;

  return { theme };
};

export default useTheme;
