import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native";
import theme from "../theme";

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

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues, 
    validationSchema, 
    onSubmit
  });

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")} />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      {console.log(formik.touched)}
      <TextInput secureTextEntry
        style={styles.textInput}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")} />
      <Pressable onPress={onSubmit}>
        <Text style={styles.submissionButton}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;