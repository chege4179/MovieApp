import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../types/getLatestMoviesResponseTypes";
import { getPosterPath } from "../util/imageUtil";
import { useNavigation } from "@react-navigation/native";
import Screens from "../util/Screens";


type MovieCardProps = {
     movie:Movie
}
const MovieCard = ({ movie }:MovieCardProps) => {
     const navigation = useNavigation()
     const goToSingleMovieScreen = () => {
          navigation.navigate(Screens.SINGLE_MOVIE_SCREEN,{
               id:movie.id
          })
     }
     return (
          <TouchableOpacity style={styles.container} onPress={goToSingleMovieScreen}>
               <Image
                    style={styles.image}
                    source={{
                         uri:getPosterPath(movie.backdrop_path)
                    }}
               />
               <Text style={styles.movieTitle}>{movie.title}</Text>

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
export default MovieCard;
