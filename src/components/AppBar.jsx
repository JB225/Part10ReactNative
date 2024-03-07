import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: theme.padding.menuBottomPadding,
    paddingHorizontal: theme.padding.menuHorizontalLeftPadding
  },
  text: {
    color: theme.colors.menuText,
    fontWeight: theme.fontWeights.bold,
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;