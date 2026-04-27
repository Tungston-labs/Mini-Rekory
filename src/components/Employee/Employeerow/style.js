import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 14,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    color: "#000",
    fontFamily: "PoppinsMedium",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:"red"

  },
  locationText: {
    fontSize: 12,
    // marginLeft:,
    fontFamily: "PoppinsRegular",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
  },

  rightStack: {
    flexDirection: "column",
    alignItems: "flex-end",
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 6,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    fontSize: 14,
    color: "#999",
    marginRight: 4,
    fontFamily: "PoppinsRegular",
  },

  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C61217",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "PoppinsMedium",
    alignItems: "center",
    justifyContent: "center",
  },
});
