import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
      paddingHorizontal: 15,
  },
  timeContainer: {
    alignItems: "center",
    marginTop:30,
  },
  timeText: {
    fontSize: 35,
    fontWeight: "400",
    color: "#111",
  },
  dateText: {
    fontSize: 15,
    color: "#999",
    marginTop: 8,
  },
  
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    position: "relative",
    height: 300,
    width: 300,
    marginTop: 30,
  },

  outerGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
  },

  innerCircle: {
    position: "absolute", 
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#F3F4F6", 
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D1FAE5", 
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  greenRingInside: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "#4ADE80", 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  checkInText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginTop: 5,
  },

  // Stats Container
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 60,
  },

  statBox: {
    alignItems: "center",
    flex: 1,
  },

  statDivider: {
    fontSize: 16,
    color: "#333",
    marginVertical: 8,
    // letterSpacing: 2,
  },

  statLabel: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
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
  },

  monthText: {
    fontSize: 12,
    color: "#444",
  },
  
   header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
        marginVertical: 20,
  },

  hello: {
    fontSize: 18,
    fontWeight: "700",
  },

  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  profile: {
    width: 40,
    height: 40,
    borderRadius: 22,
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