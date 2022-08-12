import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_TOPICS } from './graphql';

export const useGetTopics = (topic) => {
  const [relatedTopics, setRelatedTopics] = useState([]);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(10);

  const onCompleted = (res) => {
    setTopics(res.topic.repositories.nodes);
    setRelatedTopics(res.topic.relatedTopics);
    setTotalCount(res.topic.repositories.totalCount);
  };

  const onError = (err) => {
    setError(err);
  };

  const { loading, fetchMore } = useQuery(SEARCH_TOPICS, {
    variables: {
      topic: topic,
    },
    fetchPolicy: 'network-only',
    onCompleted,
    onError,
  });

  return { topics, relatedTopics, error, loading, totalCount, fetchMore };
};
