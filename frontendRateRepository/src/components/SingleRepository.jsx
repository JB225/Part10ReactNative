import { FlatList, StyleSheet, Text, View } from "react-native";
import RepositoryInfo from "./RepositoryInfo";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height,
    backgroundColor: theme.colors.mainComponentBackground
  },
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
  
const ItemSeparator = () => <View style={styles.separator} />;
  
const ReviewItem = ({ review }) => {
  var parsedDate = format(new Date(review.createdAt), "MM.dd.yyyy");

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
  
const SingleRepository = () => {
  let { userId } = useParams();
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, 
    {variables: { "repositoryId": userId }},
    {fetchPolicy: "cache-and-network"});
      
  if (error) {
    console.log(error);
  }
    
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];
      
  return (
    <View>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
      />
      <ItemSeparator/>
    </View>
  );
};
  
export default SingleRepository;