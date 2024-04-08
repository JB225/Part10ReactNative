import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";
import { GET_ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";

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
  const { data } = useQuery(GET_ME);

  return <View style={styles.container}>
    <ScrollView horizontal>
      {console.log(data.me)}
      <Link to="/list">
        <AppBarTab text={"Repositories"}/>
      </Link>
      <Link to="/">
        {data.me ? <AppBarTab text={"Sign in"}/> : <AppBarTab text={"Sign out"}/>}
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;