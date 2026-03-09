import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
    paddingTop: 60,
      paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
    textAlign: "center",
    color: "#000",
  },

  subtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    color: "#7A7A7A",
    marginTop: 6,
  },

  logo: {
    width: width * 0.35,
    height: width * 0.35,
    alignSelf: "center",
    marginVertical: 32,
  },

  label: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#000",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F6F7F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    marginBottom: 20,
  },

  passwordWrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
  },

  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  remember: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ABB3BB",
    marginRight: 8,
  },

  rememberText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#ABB3BB",
  },

  forgot: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#D70404",
  },

  button: {
    backgroundColor: "#C61217",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
});
