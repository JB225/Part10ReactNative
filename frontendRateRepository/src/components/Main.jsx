import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const login = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<SignIn onSubmit={login}/>} />
        <Route path="/list" element={<RepositoryList/>} />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </View>
  );
};

export default Main;