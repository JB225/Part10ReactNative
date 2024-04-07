import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});

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

const initialValues = {
  username: "",
  password: ""
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const {username, password} = values;

    try {
      await signIn({username, password});
    } catch (e) {
      console.log(e);
    }
  };


  const formik = useFormik({
    initialValues, 
    validationSchema
  });

  const getErrorStyle = (error) => {
    if (error) {
      return {
        borderWidth: 1,
        borderColor: theme.colors.redErrorColour
      };
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
      <TextInput secureTextEntry
        style={[styles.textInput, getErrorStyle(formik.errors.password)]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")} />
      {formik.errors.password && (
        <Text style={{ color: theme.colors.redErrorColour, padding: theme.padding.standardPadding }}>
          {formik.errors.password}</Text>
      )}
      <Pressable onPress={() => {
        let username = formik.values.username;
        let password = formik.values.password;
        onSubmit({username, password});
      }}>
        <Text style={styles.submissionButton}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;