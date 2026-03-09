import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backArrow: {
    fontSize: 28,
    color: "#000",
    width: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  /* Content */
  container: {
    padding: 20,
  },

  /* Avatar */
  avatarWrapper: {
    alignSelf: "center",
    marginTop: 16,
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    fontSize: 48,
    color: "#000",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    color: "#FFF",
    fontSize: 14,
  },
  avatarLabel: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },

  /* Form */
  form: {
    marginTop: 24,
  },
  label: {
    fontSize: 13,
    color: "#000",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#FFF",
    alignContent:"center",
    justifyContent:"center"
  },

  /* Button */
  saveButton: {
    marginTop: 28,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  
  dropdown: {
  height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    fontSize: 12,
    color: "#000",
    backgroundColor: "#FFF",
}
});