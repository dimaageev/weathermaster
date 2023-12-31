import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    borderWidth: 0.3,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  statusContainer: {
    padding: 5,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 15,
    alignItems: "center",
  },
  roundContainer: {
    borderWidth: 0.4,
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
  },
  answerContainer: {
    marginVertical: 5,
    marginLeft: 5,
  },
  roundHeaderLabel: {
    fontWeight: "700",
  },
});
