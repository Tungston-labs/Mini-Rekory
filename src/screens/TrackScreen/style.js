import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  background: {
    flex: 1,
  },

  content: {
    alignItems: "center",
    marginTop: 120,
    paddingHorizontal: 24,
  },

  topImage: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 28,
  },

  title: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 24,
    textAlign: "center",
    color: "#000",
    marginBottom: 6,
  },

  description: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },

  dots: {
    flexDirection: "row",
    marginTop: 8,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginHorizontal: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D0D0D0",
    marginHorizontal: 6,
    marginBottom:20,
  },

button: {
  backgroundColor: "#000",
  paddingVertical: 16,
  borderRadius: 18,
  width: "40%",
  alignSelf: "center",
  marginBottom: 80,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 24 },
  shadowOpacity: 0.24,
  shadowRadius: 32,
  elevation: 12,
},

buttonText: {
  color: "#FFF",
  fontSize: 16,
},

  
  trackWrapper: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 24,
},

pinLeft: {
  position: "absolute",
  left: 10,
  marginTop:-300,
},

pinRight: {
  position: "absolute",
  right: 10,
  marginTop:230,
},

});
