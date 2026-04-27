import { StyleSheet } from "react-native";

export default StyleSheet.create({
row: {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
  backgroundColor: "#FFF",
},
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    color: "#000",
    fontFamily: "PoppinsMedium",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locText: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: "PoppinsRegular",
  },
  right: {
    alignItems: "flex-end",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 6,
  },
  time: {
    fontSize: 14,
    color: "#999",
     fontFamily: "PoppinsRegular",
  },

  timeRow: {
  flexDirection: "row",
  alignItems: "center",
},
divider: {
  height: 1,
  backgroundColor: "#EEE",
  marginLeft: 30,
    marginRight: 30,
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
  alignItems:"center",
  justifyContent:"center",
},
});
