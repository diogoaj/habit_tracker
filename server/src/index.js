const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import')
const typeDefs = importSchema('./src/schema.graphql')
const { PrismaClient } = require("@prisma/client")
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Habit = require('./resolvers/Habit')

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
  context: {
    prisma,
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});