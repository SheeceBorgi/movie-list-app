import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const MovieItem = ({ item }) => {
  const getYearFromDate = (value) => {
    if (value) {
      const date = new Date(value);
      return date.getFullYear();
    }
  };

  return (
    <View style={styles.container}>
      {item?.poster_path ? (
        <Image
          source={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
          contentFit="cover"
          placeholder={`https://image.tmdb.org/t/p/w92${item?.poster_path}`}
          placeholderContentFit="cover"
          style={styles.poster}
        />
      ) : (
        <View style={styles.emptyPoster}>
          <Text style={styles.emptyPosterText}>No Image</Text>
        </View>
      )}

      <View style={styles.movieDetailsContainer}>
        <View style={styles.movieTitleContainer}>
          <Text
            style={styles.movieTitleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item?.title}
          </Text>
          <View style={styles.movieRatingContainer}>
            <Text style={styles.movieRatingText}>
              {parseFloat(item?.vote_average).toFixed(1)}
            </Text>
            <Ionicons name="star-sharp" size={14} color="yellow" />
          </View>
        </View>

        <View style={styles.movieYearContainer}>
          <Text style={styles.movieYearText}>
            {getYearFromDate(item?.release_date)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    width: "100%",
  },
  poster: {
    flex: 1,
    height: 200,
    borderRadius: 8,
  },
  emptyPoster: {
    height: 200,
    flex: 1,
    backgroundColor: COLORS.emptyPosterBgColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPosterText: {
    color: COLORS.emptyPosterText,
    fontWeight: 600,
    fontSize: 24,
  },
  movieDetailsContainer: {
    marginTop: 10,
    alignItem: "center",
    flexDirection: "column",
    gap: 5,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  movieTitleText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 500,
    flex: 1,
    marginRight: 5,
  },
  movieRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  movieRatingText: {
    color: COLORS.white,
    fontSize: 14,
    marginHorizontal: 2,
  },
  movieYearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieYearText: { color: COLORS.white, fontSize: 14 },
});
