import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";
import { GET_ME } from "../graphql/queries";
import { useApolloClient, useQuery } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import {useNavigate} from "react-router-native";


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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const signOut = () => {
    console.log("SIGNED OUT");
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return <View style={styles.container}>
    <ScrollView horizontal>
      {console.log(data)}
      <Link to="/list">
        <AppBarTab text={"Repositories"}/>
      </Link>
      { data && data.me ? 
        <Link to="/">
          <Pressable onPress={signOut}>
            <AppBarTab text={"Sign out"}/>
          </Pressable>
        </Link> :
        <Link to="/">
          <AppBarTab text={"Sign in"} />
        </Link> }
    </ScrollView>
  </View>;
};

export default AppBar;