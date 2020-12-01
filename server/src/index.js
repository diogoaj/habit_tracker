const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import')
const typeDefs = importSchema('./src/schema.graphql')
const Date = require('./resolvers/Date')

const resolvers = {
  Date
};

const server = new ApolloServer({ 
  typeDefs,
  resolvers 
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});