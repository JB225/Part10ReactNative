import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const styles = StyleSheet.create({
  ratingScore: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.blueBackgroundColour,
    color: theme.colors.blueBackgroundColour,
    borderWidth: 2,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold
  },
  primaryText: {
    fontWeight: theme.fontWeights.bold,
    margin: theme.margins.standardMargin,
    marginBottom: theme.margins.topOrBottomMargin,
    fontFamily: theme.fonts.main
  },
  secondaryText: {
    margin: theme.margins.standardMargin,
    marginTop: theme.margins.topOrBottomMargin,
    fontFamily: theme.fonts.main
  },
  flexContainerRow: {
    flexDirection: "row",
    margin: theme.margins.standardMargin,
    justifyContent: "center"
  },
  flexContainerColumn: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    flexShrink: 1
  },
  submissionButton: {
    backgroundColor: theme.colors.blueBackgroundColour,
    margin: theme.margins.standardMargin,
    borderRadius: theme.border.standardBorderRadius,
    color: theme.colors.whiteText,
    textAlign: "center",
    padding: theme.padding.standardPadding * 2,
  },
  deleteButton: {
    backgroundColor: theme.colors.redErrorColour,
    margin: theme.margins.standardMargin,
    borderRadius: theme.border.standardBorderRadius,
    color: theme.colors.whiteText,
    textAlign: "center",
    padding: theme.padding.standardPadding * 2,
  },
  pressable: {
    flex: 1
  }
});


const ReviewItem = ({ review, actions, refetch }) => {
  var parsedDate = format(new Date(review.createdAt), "MM.dd.yyyy");
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const onView = () => {
    navigate(`/users/${review.repository.id}`);
  };

  const onDelete = () => {
    Alert.alert("Delete Review", "Are you sure you want to delete this review?", [
      { text: "CANCEL",
        onPress: () => console.log("Cancel")}, 
      {text: "DELETE",
        onPress: async () => {
          try {
            await mutate({variables: {  deleteReviewId: review.id }});
            refetch();
          } catch (err) {
            console.log(err);
          }
        }}]);
  };
  
  return (
    <View>
      <View style={styles.flexContainerRow}>
        <Text style={styles.ratingScore}>{review.rating}</Text>
  
        <View style={styles.flexContainerColumn}>
          {actions ? 
            <Text style={styles.primaryText}>{review.repository.fullName}</Text> : 
            <Text style={styles.primaryText}>{review.user.username}</Text> }
          <Text style={styles.secondaryText}>{parsedDate}</Text>
          <Text style={styles.secondaryText}>{review.text}</Text>          
        </View>
      </View>
      
      {actions && 
      <View style={styles.flexContainerRow}>
        <Pressable style={styles.pressable} onPress={() => onView()}>
          <Text style={styles.submissionButton}>View Repository</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => onDelete()}>
          <Text style={styles.deleteButton}>Delete Review</Text>
        </Pressable>
      </View>}
    </View>
  );
};

export default ReviewItem;