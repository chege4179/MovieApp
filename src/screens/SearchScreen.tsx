import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";

const SearchScreen = () => {
     const navigation = useNavigation()
     useLayoutEffect(() => {
          navigation.setOptions({
               headerShown:false,
          })

     },[]);

     return (
          <View>


          </View>
     );
};

export default SearchScreen;
