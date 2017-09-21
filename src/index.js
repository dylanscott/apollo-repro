import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import Link from 'apollo-link-http';
import Cache from 'apollo-cache-inmemory';

import App from './App';
import './index.css';

const client = new ApolloClient({
  link: new Link({ uri: '/graphql' }),
  cache: new Cache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);