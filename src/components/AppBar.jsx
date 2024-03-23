import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: theme.padding.menuBottomPadding,
    paddingHorizontal: theme.padding.menuHorizontalLeftPadding,
    flexDirection: "row",
    fontFamily: theme.fonts.main
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/list">
        <AppBarTab text={"Repositories"}/>
      </Link>
      <Link to="/">
        <AppBarTab text={"Sign in"}/>
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;