import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {fetchPolicy: "cache-and-network"});

  const fetchRepositories = async () => {
    if (error) {
      console.log(error);
      return error;
    }

    setRepositories(data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;