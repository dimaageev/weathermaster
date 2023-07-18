import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 0.3,
    marginHorizontal: 15,
    marginTop: 10,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: "space-between",
    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowRadius: 4,
  },
  statusContainer: {
    padding: 5,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderWidth: 0.3,
    borderTopWidth: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
  },
});
