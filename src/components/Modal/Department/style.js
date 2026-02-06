import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
position:"relative"
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    height:450,
  },

  header: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  headerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  content: {
    padding: 16,
  },

  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#000",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
     justifyContent:"flex-end"
   
  },

  createBtn: {
    backgroundColor: "#C61217",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },

  createText: {
    color: "#FFF",
    fontWeight: "600",
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },

  cancelText: {
    color: "#000",
    fontWeight: "500",
  },
});
