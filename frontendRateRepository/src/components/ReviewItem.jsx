import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { format } from "date-fns";

const ReviewItem = ({ review }) => {
  var parsedDate = format(new Date(review.createdAt), "MM.dd.yyyy");

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
    },
    flexContainerColumn: {
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
      flexShrink: 1
    },
  });
  
  return (
    <View>
      <View style={styles.flexContainerRow}>
        <Text style={styles.ratingScore}>{review.rating}</Text>
  
        <View style={styles.flexContainerColumn}>
          <Text style={styles.primaryText}>{review.user.username}</Text>
          <Text style={styles.secondaryText}>{parsedDate}</Text>
          <Text style={styles.secondaryText}>{review.text}</Text>          
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;