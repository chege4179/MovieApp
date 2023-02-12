import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../types/getLatestMoviesResponseTypes";
import { getPosterPath } from "../util/imageUtil";
import { useNavigation } from "@react-navigation/native";
import Screens from "../util/Screens";
import { TvShow } from "../types/getLatestTvShowsResponseTypes";


type TvShowCardProps = {
     tvshow:TvShow
}
const TvShowCard = ({ tvshow }:TvShowCardProps) => {
     const navigation = useNavigation()
     const goToSingleMovieScreen = () => {
          navigation.navigate(Screens.SINGLE_TV_SHOW_SCREEN,{
               id:tvshow.id
          })
     }
     return (
          <TouchableOpacity style={styles.container} onPress={goToSingleMovieScreen}>
               <Image
                    style={styles.image}
                    source={{
                         uri:getPosterPath(tvshow.poster_path)
                    }}
               />
               <Text style={styles.movieTitle}>{tvshow.name}</Text>

          </TouchableOpacity>
     );
};
const styles = StyleSheet.create({
     container:{
          width:Dimensions.get("window").width * 0.45,
          height:200,
          margin:10,
     },
     image:{
          width:"100%",
          height:160,
          borderRadius:10,
     },
     movieTitle:{
          color:"black",
          fontWeight:"bold",
          fontSize:16,
     }
})
export default TvShowCard;
