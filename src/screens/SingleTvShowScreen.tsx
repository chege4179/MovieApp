import React, { useLayoutEffect } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { MovieDetails } from "../types/getSingleMovieResponseTypes";
import { API_KEY, BASE_URL } from "../util/BaseURL";
import { TvShowDetails } from "../types/getSingleTvShowResponseTypes";
import { getPosterPath } from "../util/imageUtil";

const SingleTvShowScreen = () => {
     const navigation = useNavigation();
     const route = useRoute();
     const { id } = route.params;

     const { isLoading, error, data } = useQuery<TvShowDetails>(["tvshow/"+id], () =>
          fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`)
               .then(res => res.json()),
     );
     useLayoutEffect(() => {
          navigation.setOptions({
               headerTitle:data?.name
          })
     },[data]);
     return (
          <View style={styles.container}>
               <>
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
                                   <Text style={styles.movieTitle}>{data?.name}</Text>
                                   <Text style={styles.movieOverViewTitle}>Overview : </Text>
                                   <Text style={styles.movieOverView}>{data?.overview}</Text>
                                   <Text style={styles.movieRuntime}>First Air Date : {data?.first_air_date.toString()}</Text>
                                   <Text style={styles.movieRuntime}>{data.genres.map((genre) => genre.name).join(" , ")}</Text>
                                   <Text style={styles.movieRuntime}>No of seasons : {data.seasons.length}</Text>
                              </View>
                         </View>
                    )}
                    {error && (<Text>{JSON.stringify(error)}</Text>)}
               </>

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
export default SingleTvShowScreen;
