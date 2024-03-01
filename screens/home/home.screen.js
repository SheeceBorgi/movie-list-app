import { View, FlatList, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { getAPIKey } from "../../utils";
import { discoverMoviesService } from "../../api/movie-service";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import MovieItem from "../../components/MovieItem";
import Loader from "../../components/Loader";
import LoadMoreButton from "../../components/LoadMoreButton";

const Home = () => {
  const APIKey = getAPIKey();
  const url = `https://api.themoviedb.org/3/discover/movie`;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const flatListRef = useRef();

  const fetchMovies = async (page) => {
    try {
      if (!loadingMore) setLoading(true);
      const response = await discoverMoviesService({
        url,
        params: {
          api_key: APIKey,
          page,
          sort_by: "popularity.desc",
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
    fetchMovies(page);
  }, [page]);

  const loadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
        <Text
          style={{
            color: COLORS.accentColor,
            fontSize: 30,
            fontWeight: 900,
          }}
        >
          D
        </Text>
        <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: 900 }}>
          iscover
        </Text>
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
      {!loading ? (
        <View style={styles.movieListContainer}>
          <FlatList
            ListHeaderComponent={renderHeader}
            columnWrapperStyle={{ gap: 10, padding: 10 }}
            data={movies}
            keyExtractor={(item, index) => item?.id + index}
            renderItem={({ item }) => <MovieItem item={item} />}
            horizontal={false}
            numColumns={2}
            onEndReachedThreshold={0.5}
            ListFooterComponentStyle={styles.movieListFooter}
            ListFooterComponent={renderFooter}
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  movieListContainer: { marginBottom: 20 },
  movieListFooter: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 100,
  },
});
