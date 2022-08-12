import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from './commonActions.js';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

let accessToken = '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';
const authLink = setContext((_, { headers }) => {
  const token = accessToken || getCookie('_access_token');
  accessToken = token;

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
