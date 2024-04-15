import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import { useFormik } from "formik";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

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
  owner: yup.string().required("Repository owner name is required"),
  name: yup.string().required("Repository name is required"),
  rating: yup.number().required("Rating is required").min(0).max(100),
  review: yup.string().notRequired()
});


const initialValues = {
  owner: "",
  name: "",
  rating: 0,
  review: ""
};

const ReviewForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues, 
    validationSchema
  });

  const onSubmit = async () => {
    const reviewData = {
      "repositoryName": formik.values.name,
      "text": formik.values.review,
      "rating": formik.values.rating,
      "ownerName":  formik.values.owner
    };

    console.log(reviewData);

    try {
      const {data} = await mutate({ variables: {
        review: {
          "repositoryName": formik.values.name,
          "text": formik.values.review,
          "rating": Number(formik.values.rating),
          "ownerName":  formik.values.owner
        }}}
      );

      apolloClient.resetStore();
      navigate(`/users/${data.createReview.repositoryId}`);

    } catch (err){
      console.log(err);
    }
  };

  return (
    <View>
      <TextInput
        style={[styles.textInput, getErrorStyle(formik.errors.owner)]}
        placeholder="Repository owner name"
        value={formik.values.owner}
        onChangeText={formik.handleChange("owner")} />
      {formik.errors.owner && (
        <Text style={{ color: theme.colors.redErrorColour, padding: theme.padding.standardPadding }}>
          {formik.errors.owner}</Text>
      )}    
      <TextInput
        style={[styles.textInput, getErrorStyle(formik.errors.name)]}
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")} />
      {formik.errors.name && (
        <Text style={{ color: theme.colors.redErrorColour, padding: theme.padding.standardPadding }}>
          {formik.errors.name}</Text>
      )}    
      <TextInput
        style={[styles.textInput, getErrorStyle(formik.errors.rating)]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")} />
      {formik.errors.rating && (
        <Text style={{ color: theme.colors.redErrorColour, padding: theme.padding.standardPadding }}>
          {formik.errors.rating}</Text>
      )}    
      <TextInput
        style={[styles.textInput, getErrorStyle(formik.errors.review)]}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        multiline={true} />
      <Pressable onPress={() => {
        let username = formik.values.username;
        let password = formik.values.password;
        onSubmit({username, password});
      }}>
        <Text style={styles.submissionButton}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;