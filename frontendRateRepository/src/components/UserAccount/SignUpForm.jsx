import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../../theme";
import * as yup from "yup";
import { useFormik } from "formik";
import { CREATE_USER } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import useSignIn from "../../hooks/useSignIn";

const styles = StyleSheet.create({
  textInput: {
    margin: theme.margins.standardMargin,
    borderWidth: theme.border.standardBorderWidth,
    borderRadius: theme.border.standardBorderRadius,
    padding: theme.padding.standardPadding,
    borderColor: theme.colors.mainComponentBackground,
    fontFamily: theme.fonts.main
  }, 
  submissionButton: {
    backgroundColor: theme.colors.blueBackgroundColour,
    margin: theme.margins.standardMargin,
    borderRadius: theme.border.standardBorderRadius,
    color: theme.colors.whiteText,
    textAlign: "center",
    padding: theme.padding.standardPadding * 2
  }
});

const getErrorStyle = (error) => {
  if (error) {
    return {
      borderWidth: 1,
      borderColor: theme.colors.redErrorColour
    };
  }
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(5).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required")
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation : ""
};

const SignUpForm = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues, 
    validationSchema
  });


  const onSubmit = async () => {
    try {
      const username = formik.values.username;
      const password = formik.values.password;

      await mutate({ variables: {
        "user": {
          "username": username,
          "password": password
        }}});

      await signIn({username, password});

    } catch (err){
      console.log(err);
    }
  };

  return (
    <View>
      <TextInput
        style={[styles.textInput, getErrorStyle(formik.errors.username)]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")} />
      {formik.errors.username && (
        <Text style={{ color: theme.colors.redErrorColour, padding: theme.padding.standardPadding }}>
          {formik.errors.username}</Text>
      )}      
      <TextInput
        style={[styles.textInput, getErrorStyle(formik.errors.password)]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")} />
      {formik.errors.password && (
        <Text style={{ color: theme.colors.redErrorColour, padding: theme.padding.standardPadding }}>
          {formik.errors.password}</Text>
      )}
      <TextInput
        style={[styles.textInput, getErrorStyle(formik.errors.passwordConfirmation)]}
        placeholder="Password Confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")} />
      {formik.errors.passwordConfirmation && (
        <Text style={{ color: theme.colors.redErrorColour, padding: theme.padding.standardPadding }}>
          {formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable onPress={() => { onSubmit(); }}>
        <Text style={styles.submissionButton}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;