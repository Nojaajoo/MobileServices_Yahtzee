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
      }
})