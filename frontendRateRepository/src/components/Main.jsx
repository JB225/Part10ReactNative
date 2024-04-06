import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const [signIn, result] = useSignIn();

  const login = (username, password) => {
    signIn({username, password});
    console.log(result.data.authenticate.accessToken);
  };

  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<SignIn login={login}/>} />
        <Route path="/list" element={<RepositoryList/>} />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </View>
  );
};

export default Main;