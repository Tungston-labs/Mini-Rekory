import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  lineShort: {
    width: "40%",
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    marginBottom: 8,
  },
  lineLong: {
    width: "70%",
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
  },
});
