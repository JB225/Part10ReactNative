import { useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = ( selectedOrder, filterText ) => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, 
    {fetchPolicy: "cache-and-network",
      onCompleted: (data) => setRepositories(data.repositories),
      variables: {  
        "orderBy": selectedOrder == "latest" ? "CREATED_AT" : "RATING_AVERAGE",
        "orderDirection": selectedOrder == "lowest" ? "ASC" : "DESC",
        "searchKeyword": filterText
      }});

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

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;