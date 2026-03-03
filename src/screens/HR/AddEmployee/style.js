import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7F8",
  },
   screen: {
        flex: 1,
        backgroundColor: "#F6F7F8",
    },


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
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    paddingLeft: 12,
    fontFamily: "PoppinsRegular",
  },

  container: {
    padding: 20,
  },


  avatarWrapper: {
    alignSelf: "center",
    marginTop: 16,
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#C61217",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarLabel: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
    color: "#000",
    fontFamily: "PoppinsMedium",
  },


  form: {
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    color: "#000",
    marginTop: 10,
    fontFamily: "PoppinsRegular",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#FFF",
    
  },

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
});
