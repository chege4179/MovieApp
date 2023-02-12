import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { API_KEY, BASE_URL } from "../util/BaseURL";
import { useInfiniteQuery } from "react-query";
import QueryKeys from "../util/QueryKeys";
import TvShowCard from "../components/TvShowCard";
import { GetLatestTvShowsResponseTypes } from "../types/getLatestTvShowsResponseTypes";


const AllTvShowsScreen = () => {
     const fetchPopularTvShows = (page = 1) =>
          fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
               .then(res => res.json())
     const { isLoading, error, data,isFetching,isPreviousData,
          isError,isLoadingError,isFetchingNextPage,hasNextPage,
          fetchNextPage
     } = useInfiniteQuery<GetLatestTvShowsResponseTypes, Error>(
          [QueryKeys.LATEST_TV_SHOWS],
          ({ pageParam = 1 }) => fetchPopularTvShows(pageParam),
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
                         keyExtractor={(item) => item.id.toString() }
                         renderItem={({ item }) => {
                              return(
                                   <TvShowCard tvshow={item}/>
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
export default AllTvShowsScreen;
