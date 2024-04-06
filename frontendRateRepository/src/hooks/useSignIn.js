import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  
  const signIn = async ({ username, password }) => {
    mutate({ variables: {
      credentials: {
        password: password,
        username: username
      }}});
  };
  
  return [signIn, result];
};

export default useSignIn;