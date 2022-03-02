import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
      },
      header: {
          backgroundColor: 'orange',
          justifyContent: "center"
      },
      headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        alignSelf: "flex-end"
      },
      footer: {
          backgroundColor: 'red',
          justifyContent: "center"
      },
      footerText: {
        color: "white",
        marginBottom: 10,
        alignSelf: "flex-end"
      },
      dices: {
        marginTop: 10,
        justifyContent: "flex-end"
      },
      row: {
        justifyContent: "center",
      },
      throwsText: {
        marginTop: 20
      },
      statusText: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: "bold",
      },
      totalText: {
        fontSize: 20,
        fontWeight: "bold",
      },
      pointStatusText: {
        marginTop: 10
      },
      pointSlot: {
          alignItems: 'center',
          padding: 5,
      },
      pointSlotText: {
        margin: 5,
        fontWeight: 'bold',
      },
      button: {
        margin: 30,
        flexDirection: "column",
        padding: 10,
        backgroundColor: "orange",
        width: 150,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
      },
      buttonText: {
        color:"#2B2B52",
        fontSize: 20
      }
})