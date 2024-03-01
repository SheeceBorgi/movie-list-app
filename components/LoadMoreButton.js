import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const LoadMoreButton = ({ loadMore }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={loadMore}
      testID="loadMore"
    >
      <Text style={styles.buttonText}>Load More</Text>
    </TouchableOpacity>
  );
};

export default LoadMoreButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.accentColor,
    paddingHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 15,
  },
});
