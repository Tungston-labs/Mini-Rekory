import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safe: {
    // flex: 1,
    backgroundColor: "",
  },
  container: {
    flex:1,
    padding: 16,
    // paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    fontFamily: "PoppinsSemiBold",
  },
  subText: {
    fontSize: 14,
    marginTop: 2,
       fontFamily: "PoppinsRegular",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 48,
    marginBottom: 16,
    fontFamily: "PoppinsRegular",
     borderColor: "#EEEEEE",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
    fontFamily: "PoppinsRegular",
  },
  statRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: "PoppinsMedium",
  },
  searchBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
employeeList: {
  backgroundColor: "#FFF",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  overflow: "hidden",
},
 profile: {
    width: 40,
    height: 40,
    borderRadius: 22,
  },
  profileIcon: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#E5E7EB",
  justifyContent: "center",
  alignItems: "center",
},
});
