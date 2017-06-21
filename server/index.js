const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
type Query {
  list(type: String!): [Int]!
}
`;

const resolvers = {
  Query: {
    list(root, { type }) {
      if (type === 'evens') {
        return delayed([2, 4, 6, 8, 10]);
      } else if (type === 'odds') {
        return delayed([1, 3, 5, 7, 9]);
      } else {
        throw new Error(`unrecognized list type: ${type}`)
      }
    }
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