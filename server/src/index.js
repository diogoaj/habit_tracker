const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import')
const { PrismaClient } = require("@prisma/client")
const typeDefs = importSchema('./src/schema.graphql')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Habit = require('./resolvers/Habit')
const { getUserId } = require('./utils');

const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation,
  User,
  Habit
};

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});