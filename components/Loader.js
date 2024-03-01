import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  return (
    <View style={styles.container} testID="loader">
      <LottieView
        autoPlay
        style={styles.loader}
        source={require("../assets/loader.json")}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    width: "100%",
    height: 80,
  },
});
