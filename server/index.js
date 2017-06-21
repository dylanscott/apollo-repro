const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
type Query {
  odds: [Int]!
  evens: [Int]!
}
`;

const resolvers = {
  Query: {
    odds() {
      return delayed([1, 3, 5, 7, 9]);
    },
    evens() {
      return delayed([2, 4, 6, 8, 10]);
    },
  }
};

// returns a Promise that resolves to value after 2 seconds
function delayed(value) {
  return new Promise((res) => {
    setTimeout(() => res(value), 2000);
  });
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.listen(3001);