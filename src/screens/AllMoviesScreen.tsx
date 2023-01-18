import React from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { API_KEY, BASE_URL } from "../util/BaseURL";
import QueryKeys from "../util/QueryKeys";
import { GetLatestMoviesResponse } from "../types/getLatestMoviesResponseTypes";
import MovieCard from "../components/MovieCard";

const AllMoviesScreen = () => {
     const navigation = useNavigation()
     const [page, setPage] = React.useState(1)

     const fetchPopularMovies = (page = 1) =>
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
          .then(res => res.json())
     const { isLoading, error, data,isFetching,isPreviousData } = useQuery<GetLatestMoviesResponse, Error>(
          [QueryKeys.LATEST_MOVIES, page], () => fetchPopularMovies(page), { keepPreviousData : true })

     return (
          <View style={styles.container}>
               {isLoading && (<ActivityIndicator animating={true} size="large"/>)}
               { data && (
                    <FlatList
                         style={styles.flatlist}
                         numColumns={2}
                         data={data.results}
                         ListFooterComponent ={
                         <View>
                              {
                                   !isFetching && (
                                        <TouchableOpacity
                                             onPress={() => {
                                                  if (!isPreviousData && (data.total_pages > page)) {
                                                       setPage(old => old + 1)
                                                  }
                                             }}
                                             // Disable the Next Page button until we know a next page is available
                                             disabled={isPreviousData || !(data.total_pages > page)}
                                        >
                                             <Text>Load More</Text>
                                        </TouchableOpacity>
                                   )
                              }
                         </View>

                         }
                         keyExtractor={(item) => item.id }
                         renderItem={(item) => {
                              return(
                                   <MovieCard movie={item.item}/>
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

     }
})
export default AllMoviesScreen;
