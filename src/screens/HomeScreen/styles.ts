import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  headerContainer: {},
  footerContainer: {
    alignItems: "center",
    paddingBottom: Platform.OS === "android" ? 20 : 0,
  },
});
