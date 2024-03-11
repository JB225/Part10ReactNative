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

  const handleTextChange = (value) => {
    formik.handleBlur(value);
    formik.handleChange(value);
    // formik.setFieldTouched(value);
    // TODO: Fix logging on touched
    // https://stackoverflow.com/questions/52258083/react-formik-yup-onchange-touch-the-field?rq=3
    // https://stackoverflow.com/questions/57385931/why-isnt-the-formik-touched-property-being-populated
    console.log("");
    console.log(formik);
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={handleTextChange("username")} />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
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