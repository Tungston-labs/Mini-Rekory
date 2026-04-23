import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F6F7F8",
    },
    screen: {
        flex: 1,
        backgroundColor: "#F6F7F8",
    },
    container: {
        flex: 1,
             backgroundColor: "#F6F7F8",
    },
    scroll: {
        flex: 1,
    },


 profileCard: {
  borderRadius: 16,
  padding: 10,
  margin: 10,
  borderWidth: 1,
  borderColor: "rgba(0,0,0,0.1)",
  backgroundColor:"white"
},

topRow: {
  flexDirection: "row",
  alignItems: "center",

},

backBtn: {
//   width: 35,
//   height: 35,
  alignItems: "center",
  justifyContent: "center",
},

avatar: {
  width: 40,
  height: 40,
  borderRadius: 25,
  marginLeft: 10,
},

callBtn: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#16B759",
  alignItems: "center",
  justifyContent: "center",
},

profileInfo: {
  marginTop: 8,
},

name: {
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 8,
},
infoRow: { 
    flexDirection: "row",
     alignItems: "center",
      marginBottom: 2,
     },
 label: { 
    width: 80, 
    fontSize: 12,
     color: "#414141", 
     fontFamily: "Poppins",
      fontWeight: "400",
     },
 colon: { 
    width: 10,
     fontSize: 14,
      color: "#414141",
     },
    locationCard: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 18,
        paddingTop: 18,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: "75%",
    },

    locationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,

    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "PoppinSemiBold",
        marginTop: 20,
    },

    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 20,

    },

    dateText: {
        fontSize: 13,
        color: "#555",
        fontFamily: "PoppinsRegular",
        fontWeight: 300,
    },

    locationRow: {
        flexDirection: "row",
    },

    timeline: {
        width: 60,
        alignItems: "center",

    },

    dot: {
        width: 45,
        height: 45,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    activeDot: {
        borderColor: "#2ECC71",
    },

    dashedLine: {
        flex: 1,
        width: 1,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#bbb",
        marginTop: 4,
    },

    locationInfo: {
        flex: 1,
        paddingBottom: 30,
        paddingLeft: 15,
    },

    place: {
        fontSize: 14,
        fontFamily: "PoppinsRegular",


    },

    time: {
        fontSize: 12,
        fontFamily: "PoppinsRegular",



    },

    currentBadge: {
        marginTop: 6,
        alignSelf: "flex-start",
        backgroundColor: "#C61217",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    currentText: {
        fontSize: 8,
        color: "#fff",
        fontWeight: "400",
    },

    noLocationWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height:120
    }
,
    avatarFallback: {
  width: 45,
  height: 45,
  borderRadius: 40,
  backgroundColor: "#EAEAEA",
  alignItems: "center",
  justifyContent: "center",
},
});
