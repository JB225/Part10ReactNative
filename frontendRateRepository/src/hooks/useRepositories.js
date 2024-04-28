import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = ( selectedOrder, filterText, first ) => {

  const variables = {
    "orderBy": selectedOrder == "latest" ? "CREATED_AT" : "RATING_AVERAGE",
    "orderDirection": selectedOrder == "lowest" ? "ASC" : "DESC",
    "searchKeyword": filterText,
    "first": first
  };

  const { data, error, fetchMore, loading } = useQuery(GET_REPOSITORIES, 
    {fetchPolicy: "cache-and-network",
      variables: variables});

  if (error) {
    console.log(error);
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        "after": data.repositories.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return { 
    repositories: data?.repositories, 
    fetchMore: handleFetchMore,
    loading
  };
};

export default useRepositories;