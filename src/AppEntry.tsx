import React, { useLayoutEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllMoviesScreen from "./screens/AllMoviesScreen";
import AllTvShowsScreen from "./screens/AllTvShowsScreen";
import Screens from "./util/Screens";
import SingleTvShowScreen from "./screens/SingleTvShowScreen";
import SingleMovieScreen from "./screens/SingleMovieScreen";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import SearchScreen from "./screens/SearchScreen";


const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator()
const AppEntry = () => {
     return (
          <Stack.Navigator
               initialRouteName={Screens.BOTTOM_TAB_WRAPPER}>

               <Stack.Screen
                    name={Screens.BOTTOM_TAB_WRAPPER}
                    component={BottomTabWrapper}/>
               <Stack.Screen
                    name={Screens.SINGLE_MOVIE_SCREEN}
                    component={SingleMovieScreen}/>
               <Stack.Screen
                    name={Screens.SINGLE_TV_SHOW_SCREEN}
                    component={SingleTvShowScreen}
               />
               <Stack.Screen
                    name={Screens.SEARCH_SCREEN}
                    component={SearchScreen}
               />

          </Stack.Navigator>
     );
};


const BottomTabWrapper = () => {
     const navigation = useNavigation()
     const goToSearchScreen = () => {
          navigation.navigate(Screens.SEARCH_SCREEN)
     }
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:"Movies App",
               headerRight:() => {
                    return(
                         <TouchableOpacity onPress={goToSearchScreen}>
                              <Feather name="search" color="black" size={30}/>
                         </TouchableOpacity>
                    )
               }
          })
     },[]);

     return(
          <Tab.Navigator>
               <Tab.Screen
                    name="Movies"
                    component={AllMoviesScreen}
                    options={{

                         tabBarIcon:() => {
                              return(
                                   <MaterialCommunityIcons name="movie" color="black" size={27} />
                              )
                         }
               }}
               />
               <Tab.Screen
                    name="Tv Shows"
                    component={AllTvShowsScreen}
                    options={{
                         tabBarIcon:() => {
                              return(
                                   <Entypo name="tv" color="black" size={27} />
                              )
                         }
                    }}
               />
          </Tab.Navigator>
     )
}
export default AppEntry;
