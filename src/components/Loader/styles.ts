import { COLORS_LIGHT } from "@src/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_LIGHT.loaderBackground,
  },
});
