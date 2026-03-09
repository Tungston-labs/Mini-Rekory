import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 90,
  },

  modalContainer: {
    width: "90%",
  },

 card: {
  flexDirection: "row",
  backgroundColor: "#fff",
  borderRadius: 10,
  overflow: "hidden",
  elevation: 5,
  padding:20,
  maxHeight: 200,
},
  dateBox: {
    backgroundColor: "#0DB40D",
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  dateNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  dayLabel: {
    fontSize: 14,
    color: "#fff",
  },


  timeSection: {
    flex: 1,
    padding: 15,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  headerText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  timeValue: {
    fontSize: 14,
    color: "#333",
  },

  messageText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
});