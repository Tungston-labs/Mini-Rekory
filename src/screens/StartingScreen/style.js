import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: width * 0.55,
    height: width * 0.55,
    marginBottom: 20,
  },

  title: {
    fontFamily: "PoppinsMedium",
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },

  description: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    color: "#000",
  },

  dots: {
    flexDirection: "row",
    marginTop: 20,
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
  },

  button: {
  marginTop: 24,
  backgroundColor: "#000",
  paddingVertical: 16,
  paddingHorizontal: 36,
  borderRadius: 18,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: 8, 

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 24 },
  shadowOpacity: 0.24,
  shadowRadius: 32,
  elevation: 8,
},


buttonText: {
  color: "#FFF",
  fontFamily: "PoppinsMedium",
  fontSize: 12,
},
});

export default styles;
