import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
        edges {
            cursor
            node {
            createdAt
            description
            forksCount
            fullName
            id
            language
            name
            openIssuesCount
            ownerAvatarUrl
            ownerName
            ratingAverage
            reviewCount
            stargazersCount
            url
            userHasReviewed
            watchersCount
            }
        }
        }
    }`;

export const GET_SINGLE_REPOSITORY = gql`
query($repositoryId: ID!) {
  repository(id: $repositoryId) {
        createdAt
    description
    forksCount
    fullName
    id
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
    userHasReviewed
    watchersCount
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}`;

export const GET_ME = gql`
query {
    me {
      id
      username
    }
  }
`;