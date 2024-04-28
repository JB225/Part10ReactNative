import { StyleSheet, View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";

import RepositoryList from "./RepositoryList/RepositoryList";
import AppBar from "./AppBar/AppBar";
import SignIn from "./UserAccount/SignIn";
import SingleRepository from "./SingleRepository/SingleRepository";
import ReviewForm from "./Reviews/ReviewForm";
import SignUpForm from "./UserAccount/SignUpForm";
import MyReviews from "./MyReviews/MyReviews";
// import MyReviews from "./MyReviews";

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
        <Route path="/createReview" element={<ReviewForm/>}/>
        <Route path="/signUpForm" element={<SignUpForm/>}/>
        <Route path="/myReviews" element={<MyReviews/>}/>
      </Routes>
    </View>
  );
};

export default Main;