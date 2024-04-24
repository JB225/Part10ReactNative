import { useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";


const useRepositories = ( selectedOrder, filterText, first ) => {
  const [repositories, setRepositories] = useState();

  const variables = {
    "orderBy": selectedOrder == "latest" ? "CREATED_AT" : "RATING_AVERAGE",
    "orderDirection": selectedOrder == "lowest" ? "ASC" : "DESC",
    "searchKeyword": filterText,
    first: first
  };

  const { data, error, fetchMore, loading } = useQuery(GET_REPOSITORIES, 
    {fetchPolicy: "cache-and-network",
      onCompleted: (data) => setRepositories(data.repositories),
      variables: variables});

  const fetchRepositories = () => {
    if (!loading) {
      try {
        setRepositories(data.repositories);
      } catch (err) {
        console.log(err);
        return error;
      }
    }
  };

  const handleFetchMore = () => {
    console.log("WORKING");
    console.log(data?.repositories.pageInfo.hasNextPage);
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log("NOT");
      return;
    }

    console.log(data.repositories.pageInfo.endCursor);

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };


  return { 
    repositories, 
    fetchMore: handleFetchMore,
    loading, 
    refetch: fetchRepositories };
};

export default useRepositories;