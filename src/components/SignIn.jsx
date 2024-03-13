import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native";
import theme from "../theme";

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
    borderColor: theme.colors.mainComponentBackground
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

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues, 
    validationSchema, 
    onSubmit
  });

  const getErrorStyle = (error) => {
    if (error) {
      return {
        borderWidth: 1,
        borderColor: "#d73a4a"
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
        <Text style={{ color: "red", padding: theme.padding.standardPadding }}>{formik.errors.username}</Text>
      )}
      {console.log(formik.touched)}
      <TextInput secureTextEntry
        style={[styles.textInput, getErrorStyle(formik.errors.password)]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")} />
      {formik.errors.password && (
        <Text style={{ color: "red", padding: theme.padding.standardPadding }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={onSubmit}>
        <Text style={styles.submissionButton}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;