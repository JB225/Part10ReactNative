import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, 
  $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, 
    searchKeyword: $searchKeyword, first: $first, after: $after) {
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
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }`;

export const GET_SINGLE_REPOSITORY = gql`
query($repositoryId: ID!, $first: Int, $after: String) {
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
    reviews(first: $first, after: $after) {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;

export const GET_ME = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            username
          }
          repository {
            fullName
            id
          }
        }
      }
    }
  }
}
`;