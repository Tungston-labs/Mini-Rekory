import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    paddingBottom: 30,
      // flexGrow: 1,     
    backgroundColor: "#F6F7F8",
  },

header: {
  backgroundColor: "#C61217",
  height: width * 0.45,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
},

profileWrapper: {
  alignItems: "center",
  marginTop: -(width * 0.22), 

},

profileImage: {
  width: width * 0.30,
  height: width * 0.30,
  borderRadius: width * 0.15,
    borderRadiuscolor: "#fff",
   borderWidth: 1,
   borderColor: "#fff",
},

name: {
  marginTop: 10,
  fontSize: 20,
  fontWeight: "bold",
  color: "#000",
},

role: {
  fontSize: 14,
  color: "#777",
},


  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  reportImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  boldText: {
    fontWeight: "600",
    fontSize: 15,
  },

  subText: {
    fontSize: 13,
    color: "#777",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: "#666",
  },

  value: {
    fontSize: 14,
    fontWeight: "500",
  },

  logoutButton: {
    marginTop: 20,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#C61217",
    alignItems: "center",
    elevation: 2,
  },

  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  PolicyButton:{
    marginTop: 12,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 2,
  },
  TermsButton:{
     marginTop: 12,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 2,
  },
    PolicyText: {
    color: "#C61217",
    fontWeight: "600",
    fontSize: 16,
  },
});
