import React, { useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "react-query";
import { API_KEY, BASE_URL } from "../util/BaseURL";
import QueryKeys from "../util/QueryKeys";
import { GetLatestMoviesResponse } from "../types/getLatestMoviesResponseTypes";
import MovieCard from "../components/MovieCard";
import { getNextPageParam } from "react-query/types/core/infiniteQueryBehavior";

const AllMoviesScreen = () => {
     const navigation = useNavigation()
     const [page, setPage] = useState(1)

     const fetchPopularMovies = (page = 1) =>
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
          .then(res => res.json())
     const { isLoading, error, data,isFetching,isFetched,fetchNextPage
     } = useInfiniteQuery<GetLatestMoviesResponse, Error>(
          [QueryKeys.LATEST_MOVIES],
          ({ pageParam = 1 }) => fetchPopularMovies(pageParam),
          {
               getNextPageParam:(prevData) => {
                    return prevData.page + 1
               }
          })

     return (
          <View style={styles.container}>
               {isLoading && (<ActivityIndicator animating={true} size="large"/>)}
               { data && (
                    <FlatList
                         style={styles.flatlist}
                         numColumns={2}
                         data={data.pages.flatMap((pageData) => pageData.results)}
                         ListFooterComponent ={
                         <View style={styles.loadMoreView}>
                              {
                                   !isFetching && (
                                        <TouchableOpacity
                                             style={styles.loadMoreButton}
                                             onPress={() => fetchNextPage()}
                                        >
                                             <Text>Load More</Text>
                                        </TouchableOpacity>
                                   )
                              }
                         </View>

                         }
                         keyExtractor={(item,index) => item.id.toString() }
                         renderItem={({ item }) => {
                              return(
                                   <MovieCard movie={item}/>
                              )
                         }}/>

               ) }
               {error && (<Text>{error.message}</Text>)}
               {isFetching && (<ActivityIndicator animating={true} size="large"/>)}





          </View>
     );
};
const styles = StyleSheet.create({
     container:{
          flex:1,

     },
     flatlist:{
          flex:1,

     },
     loadMoreView:{
          width:"100%",
          height:50,

          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",

     },
     loadMoreButton:{
          justifyContent:"center",
          alignItems:"center",
          width:100,
          height:30,
          backgroundColor:'blue',
          borderRadius:10,
     }
})
export default AllMoviesScreen;
