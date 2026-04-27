import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7F8",
  },
  container: {
    flex: 1,
    paddingTop: 16, 
  
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16, 
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    fontFamily: "PoppinsRegular",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    // paddingBottom: 120,
  },
  listContainerFullWidth: {
    width: screenWidth,          
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,       
    borderTopRightRadius: 32,
    paddingVertical: 6,
    paddingHorizontal: 20,        
    marginTop:20,
  },
  separator: {
    height: 1,
   
    
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 110,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#C61217",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
    fabIcon: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 30,
  },
  searchRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  marginBottom: 12,
},
searchBox: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFF",
  height: 50,
  paddingHorizontal: 12,
  borderRadius: 12,
  borderWidth: 1,
 borderColor: "#EEEEEE",
},
searchInput: {
  flex: 1,
  marginLeft: 8,
  fontSize: 14,
  color: "#000",
  fontFamily: "PoppinsRegular",
},
filterBtn: {
  width: 50,
  height: 50,
  marginLeft: 10,
  borderRadius: 30,
  backgroundColor: "#FFF",
  borderWidth: 1,
  borderColor: "#EEE",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "PoppinsRegular",
},
dropdown: {
  position: "absolute",
  right: 16,
  top: 120,
  backgroundColor: "#FFF",
  borderRadius: 12,
  elevation: 6,
  paddingVertical: 6,
  width: 140,
  zIndex: 10,
},
dropdownItem: {
  paddingVertical: 10,
  paddingHorizontal: 14,
},
dropdownText: {
  fontSize: 14,
  color: "#000",
},
dropdownActive: {
  color: "#C61217",
  fontWeight: "600",
},

});

