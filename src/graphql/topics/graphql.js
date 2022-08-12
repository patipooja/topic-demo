import { gql } from '@apollo/client';

export const SEARCH_TOPICS = gql`
  query searchTopic($topic: String!) {
    topic(name: $topic) {
      id
      name
      stargazerCount
      repositories(first: 10) {
        nodes {
          name
          id
          stargazerCount
          resourcePath
        }
        totalCount
      }
      relatedTopics(first: 10) {
        name
        stargazerCount
      }
    }
  }
`;
