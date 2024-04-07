import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import {useNavigate} from "react-router-native";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  const navigate = useNavigate();
  
  const signIn = async ({ username, password }) => {
    const {data} = await mutate({ variables: {
      credentials: {
        password: password,
        username: username
      }}});

    if (data.authenticate.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate("/list");
    }
  };
  
  return [signIn, result];
};

export default useSignIn;