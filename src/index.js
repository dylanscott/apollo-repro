import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import App from './App';
import './index.css';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
  }),
  connectToDevTools: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);