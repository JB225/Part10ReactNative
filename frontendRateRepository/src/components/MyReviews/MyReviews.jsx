import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GET_ME } from "../../graphql/queries";
import theme from "../../theme";
import ReviewItem from "../Reviews/ReviewItem";

// 1. Create Query
// 2. Update ApolloClient
// 3. Create FetchMore method
// 4. Add onEndReach method -> Test works
// 5. Test it grabs reviews

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height,
    backgroundColor: theme.colors.mainComponentBackground
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_ME, 
    {variables: { "includeReviews" : true }});
      
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

  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} actions={true} refetch={refetch} />}
        keyExtractor={({ id }) => id }
      />    
    </View>
  );
};

export default MyReviews;