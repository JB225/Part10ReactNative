import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight

    // ...
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
      <Text>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;