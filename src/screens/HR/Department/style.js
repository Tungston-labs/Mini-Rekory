import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F6F7F8",
        position: "relative",
    },

    header: {
        backgroundColor: "#F6F7F8",
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 16,
        color: "#000",
        fontFamily: "PoppinsRegular",
        fontWeight: 400,
    },
    searchIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        justifyContent: "center",

    },
    searchText: {
        fontSize: 14,
        fontFamily: "PoppinsRegular",
    },

    listContent: {
        backgroundColor: "#FFF",
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#C61217",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    avatarText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "PoppinsMedium",
    },
    departmentName: {
        fontSize: 16,
        color: "#000",
        fontFamily: "PoppinsRegular",
    },
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginLeft: 30,
        marginRight: 30,
    },

    fab: {
        position: "absolute",
        right: 20,
        bottom: 110,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#C61217",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
        zIndex:100,
    },
    fabIcon: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "600",
        lineHeight: 30,
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        //   marginTop: 12,
        marginBottom: 8,
        paddingHorizontal: 12,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#EEEEEE",
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#000",
    },

});

