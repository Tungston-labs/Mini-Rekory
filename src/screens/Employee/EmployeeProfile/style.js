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
},

name: {
  marginTop: 10,
  fontSize: 18,
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
  alignItems: "center",
  marginBottom: 12,
},

label: {
  width: 120, 
  fontSize: 14,
  color: "#666",
},

colon: {
  width: 20,
  fontSize: 12,
  color: "#666",
},

value: {
  flex: 1,
  fontSize: 14,
  fontWeight: "500",
  color: "#000",
},

  logoutButton: {
  marginTop: 20,
  marginHorizontal: 16,
  paddingVertical: 14,
  borderRadius: 12,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",   
},

logoutText: {
  color: "#C61217",
  fontWeight: "600",
  fontSize: 16,
  marginLeft: 8,  
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
