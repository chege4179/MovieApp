import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../types/getLatestMoviesResponseTypes";
import { getPosterPath } from "../util/imageUtil";
import { useNavigation } from "@react-navigation/native";
import Screens from "../util/Screens";


type SearchCardProps = {
     movie:Movie
}
const SearchCard = ({ movie } :SearchCardProps) => {
     const navigation = useNavigation()
     const goToSingleMovieScreen = () => {
          navigation.navigate(Screens.SINGLE_MOVIE_SCREEN,{
               id:movie.id
          })
     }
     console.log(movie);
     return (
          <TouchableOpacity style={styles.container} onPress={goToSingleMovieScreen}>
               <View style={styles.cardView}>
                    <Image
                         style={styles.image}
                         source={{
                              uri:getPosterPath(movie?.poster_path)
                         }}/>
                    <View style={styles.movieInfo}>
                         <Text style={styles.movieTitle}>{movie?.title}</Text>

                         <Text style={styles.movieTitle}>Release Date: {movie?.release_date}</Text>
                    </View>
               </View>

          </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
     container:{
          width:"100%",
          height:100,
          borderColor:"grey",
          borderWidth:1,
          borderRadius:10,
          marginVertical:5,

     },
     cardView:{
          flexDirection:"row",
          width:"100%",
          height:"100%",

     },
     image:{
          height:"100%",
          width:100,
          borderRadius:10
     },
     movieInfo:{
          padding:10,
     },
     movieTitle:{
          color:"black",
          fontWeight:"bold",
          fontSize:16,
     }
})

export default SearchCard;
