import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height,
    backgroundColor: theme.colors.mainComponentBackground
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, 
    {variables: { "repositoryId": "async-library.react-async"}},
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
        keyExtractor={({ id }) => id }
      />    
    </View>
  );
};

export default MyReviews;