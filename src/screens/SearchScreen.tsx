import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon, Input, Text } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchCard from "../components/SearchCard";
import { useQuery } from "react-query";
import { API_KEY, BASE_URL } from "../util/BaseURL";
import QueryKeys from "../util/QueryKeys";
import useDebounce from "../hooks/useDebounce";
import { GetLatestMoviesResponse } from "../types/getLatestMoviesResponseTypes";

const SearchScreen = () => {
     const navigation = useNavigation();
     const [searchText, setSearchText] = useState("");

     const searchMovies = (query: string) =>
          fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`)
               .then(res => res.json());
     const debouncedFilter = useDebounce(searchText, 500);
     const { isLoading, error, data } = useQuery<GetLatestMoviesResponse, Error>(
          [QueryKeys.SEARCH_MOVIES],
          () => searchMovies(debouncedFilter),
          {
               // The query will not execute until the userId exists
               enabled: Boolean(debouncedFilter),
          },
     );

     useLayoutEffect(() => {
          navigation.setOptions({
               headerShown: false,
          });

     }, []);

     return (
          <View style={styles.container}>
               <Input
                    placeholder="Search Movies and Tv shows"
                    width="95%"
                    borderRadius="4"
                    py="3" px="4"
                    mx={1}
                    mt={2}
                    onChangeText={(text: string) => setSearchText(text)}
                    fontSize="14"
                    InputRightElement={
                         <Icon
                              m="2" ml="3"
                              size="6" color="gray.400"
                              as={
                                   <MaterialIcons name="search" />} />
                    }
               />
               {isLoading && (<ActivityIndicator animating={true} size="large" />)}
               {error && (<Text>{error.message}</Text>)}
               {
                    data && (
                         <FlatList
                              style={styles.flatlist}
                              data={data.results}
                              renderItem={({ item }) => {
                                   return (<SearchCard movie={item} />);
                              }} />
                    )
               }

          </View>
     );
};
const styles = StyleSheet.create({
     container: {
          flex: 1,


     },
     flatlist: {
          flex: 1,
          padding: 10,

     },
});
export default SearchScreen;
