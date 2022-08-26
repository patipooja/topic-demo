import React from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./graphql/apolloClient";
import Router from "./Router";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </ApolloProvider>
  );
};

export default App;
