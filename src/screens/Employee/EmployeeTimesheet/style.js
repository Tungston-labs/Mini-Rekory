import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F8",
    paddingHorizontal: 15,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  hello: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 22,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  monthButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius:5,
  },

  monthText: {
    fontSize: 12,
    color: "#444",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    overflow: "hidden",
  },

  dateBox: {
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },

  dateText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },

  dayText: {
    fontSize: 12,
    color: "#FFF",
    marginTop: 2,
  },

  timeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  timeBlock: {
    alignItems: "center",
  },

  timeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },




  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
},
modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
},
modalText: {
    fontSize: 18,
    marginBottom: 10,
},
  profileIcon: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#E5E7EB",
  justifyContent: "center",
  alignItems: "center",
},
});