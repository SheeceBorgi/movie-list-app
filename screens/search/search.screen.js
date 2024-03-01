import { View, FlatList, TextInput, StyleSheet, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { getAPIKey } from "../../utils";
import { searchMoviesService } from "../../api/movie-service";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import Loader from "../../components/Loader";
import LoadMoreButton from "../../components/LoadMoreButton";
import MovieItem from "../../components/MovieItem";

const Search = () => {
  const APIKey = getAPIKey();
  const searchMovieUrl = "https://api.themoviedb.org/3/search/movie";
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const flatListRef = useRef();

  const fetchMovies = async (page, query = "") => {
    try {
      if (!loadingMore) setLoading(true);
      const response = await searchMoviesService({
        url: searchMovieUrl,
        params: {
          api_key: APIKey,
          page,
          query,
          sort_by: "primary_release_date.desc",
        },
      });

      if (page === 1) {
        setMovies(response?.data?.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response?.data.results]);
      }
      setTotalPages(response?.data?.total_pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (searchQuery) fetchMovies(page, searchQuery);
  }, [page, searchQuery]);

  const loadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  const onSearchHandler = (value) => {
    setSearchQuery(value);
    setPage(1);
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderHeader = () => {
    return (
      <View style={styles.searchHeaderContainer}>
        {searchQuery && movies?.length > 0 ? (
          <Text style={styles.searchHeaderText}>
            Search results for {`"${searchQuery}"`}
          </Text>
        ) : (
          <Text style={styles.searchHeaderText}>
            No results for {`"${searchQuery}"`}. Please try using different
            movie name
          </Text>
        )}
      </View>
    );
  };

  const renderFooter = () => {
    return loadingMore ? (
      <Loader />
    ) : page < totalPages && movies?.length > 0 ? (
      <LoadMoreButton loadMore={loadMore} />
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.headerContainer}>
        <View style={styles.searchInputContainer}>
          <EvilIcons name="search" size={34} color={COLORS.white} />
          <TextInput
            testID="searchTextInput"
            style={styles.searchInput}
            placeholder="Movie Name"
            placeholderTextColor={COLORS.placeholderColor}
            inputMode="search"
            returnKeyType="search"
            onSubmitEditing={({ nativeEvent: { text } }) => {
              onSearchHandler(text);
            }}
            blurOnSubmit={true}
            autoFocus={true}
          />
        </View>
      </View>
      {!loading ? (
        <FlatList
          testID="movieList"
          style={styles.movieListContainer}
          columnWrapperStyle={{ gap: 10, padding: 10 }}
          data={movies}
          keyExtractor={(item, index) => item?.id + index}
          renderItem={({ item, index }) => <MovieItem item={item} />}
          horizontal={false}
          numColumns={2}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={renderHeader}
          ListFooterComponentStyle={styles.movieListFooter}
          ListFooterComponent={renderFooter}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    flex: 1,
    paddingLeft: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInputContainer: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    borderTopColor: COLORS.white,
    borderTopWidth: 1,
    borderLeftColor: COLORS.white,
    borderLeftWidth: 1,
    borderRightColor: COLORS.white,
    borderRightWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "transparent",
    height: 40,
    paddingHorizontal: 10,
    color: COLORS.white,
    width: "100%",
  },
  movieListContainer: {
    marginBottom: 20,
  },
  movieListFooter: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 100,
  },
  searchHeaderText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 500,
    flex: 1,
    marginRight: 5,
  },
  searchHeaderContainer: {
    paddingLeft: 20,
  },
});
