import useTheme from "@src/hooks/useTheme";
import { StyleSheet, PixelRatio } from "react-native";

export default StyleSheet.create({
  pressable: {
    margin: 15,
    borderRadius: 15,
  },
  wrapper: {
    width: 220,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    elevation: PixelRatio.roundToNearestPixel(4),
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  cityLabel: {
    maxWidth: "90%",
    textAlign: "center",
  },
});
