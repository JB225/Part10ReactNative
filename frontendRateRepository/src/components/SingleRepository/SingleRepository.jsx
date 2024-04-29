import { FlatList, StyleSheet, Text, View } from "react-native";
import RepositoryInfo from "./RepositoryInfo";
import { GET_SINGLE_REPOSITORY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import theme from "../../theme";
import ReviewItem from "../Reviews/ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height,
    backgroundColor: theme.colors.mainComponentBackground
  }
});
  
const ItemSeparator = () => <View style={styles.separator} />;
  
const SingleRepository = () => {
  let { userId } = useParams();
  const variables = {
    "repositoryId": userId,
    "first": 4
  };

  const { data, error, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, 
    {variables: variables },
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

  const onEndReach = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        "after": data.repository.reviews.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];
      
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
      <ItemSeparator/>
    </View>
  );
};
  
export default SingleRepository;