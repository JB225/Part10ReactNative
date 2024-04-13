import { StyleSheet, View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/list" element={<RepositoryList/>} />
        <Route path="*" element={<Navigate to="/" replace/>}/>
        <Route path="/users/:userId" element={<SingleRepository/>}/>
      </Routes>
    </View>
  );
};

export default Main;