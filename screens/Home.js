import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAPIKey } from "../utils";
import {
  discoverMoviesService,
  searchMoviesService,
} from "../api/movie-service";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const Home = () => {
  const APIKey = getAPIKey();
  const url = `https://api.themoviedb.org/3/discover/movie`;
  const searchMovieUrl = "https://api.themoviedb.org/3/search/movie";

  const insets = useSafeAreaInsets();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page, query = "") => {
    try {
      let response;
      if (query) {
        setLoadingMore(true);
        response = await searchMoviesService({
          url,
          params: {
            api_key: APIKey,
            page,
            query,
          },
        });
      } else {
        setLoader(true);
        response = await discoverMoviesService({
          url,
          params: {
            api_key: APIKey,
            page,
            sort_by: "popularity.desc",
          },
        });
      }
      setMoviesData(response?.data?.results);
      setTotalPages(response?.data?.total_pages);
      console.log(response?.data?.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page, searchQuery]);

  const onSearchHandler = () => {
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return <View style={{ paddingTop: insets.top }}></View>;
};

export default Home;
