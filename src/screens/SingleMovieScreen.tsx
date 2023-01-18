import React, { useLayoutEffect } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_KEY, BASE_URL } from "../util/BaseURL";
import { useQuery } from "react-query";
import { MovieDetails } from "../types/getSingleMovieResponseTypes";
import { getPosterPath } from "../util/imageUtil";

const SingleMovieScreen = () => {
     const navigation = useNavigation();
     const route = useRoute();
     const { id } = route.params;

     const { isLoading, error, data } = useQuery<MovieDetails>([id], () =>
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
               .then(res => res.json()),
     );
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:data?.title
          })
     },[data]);



     return (
          <View style={styles.container}>
               {isLoading && (<ActivityIndicator animating={true} size="large" />)}
               {data && (
                    <View>
                         <Image
                              source={{
                                   uri: getPosterPath(data?.poster_path),
                              }}
                              style={styles.image}
                         />
                         <View style={styles.movieInfoContainer}>
                              <Text style={styles.movieTitle}>{data?.original_title}</Text>
                              <Text style={styles.movieOverViewTitle}>Overview : </Text>
                              <Text style={styles.movieOverView}>{data?.overview}</Text>
                              <Text style={styles.movieRuntime}>Runtime : {data?.runtime} mins</Text>
                         </View>
                    </View>
               )}
               {error && (<Text>{JSON.stringify(error)}</Text>)}
          </View>
     );
};
const styles = StyleSheet.create({
     container: {
          flex: 1,

     },
     image:{
          width:Dimensions.get("window").width,
          height:300,
     },
     movieInfoContainer:{
          padding:10,
     },
     movieTitle:{
          color:"black",
          fontWeight:"bold",
          fontSize:20,
     },
     movieOverViewTitle:{
          color:"black",
          fontWeight:"bold",
          fontSize:17,
     },
     movieOverView:{

     },
     movieRuntime:{
          color:"black",
          fontWeight:"bold",
          fontSize:16,
     }

});
export default SingleMovieScreen;
