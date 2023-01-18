import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AllMoviesScreen = () => {
     const navigation = useNavigation()

     return (
          <View style={styles.container}>


          </View>
     );
};
const styles = StyleSheet.create({
     container:{
          flex:1,
     }
})
export default AllMoviesScreen;
