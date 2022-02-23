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
      },
      footer: {
          backgroundColor: 'darkorange',
      },
      row: {
        justifyContent: "center",
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
        backgroundColor: "#73CED6",
        width: 150,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        color:"#2B2B52",
        fontSize: 20
      }
})