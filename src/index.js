const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');
const express = require('express');
const createContext = require('./utils/authentication.js');

const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({ me: await createContext(req) }),
  });

  await server.start(); 
  server.applyMiddleware({ app });  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startApolloServer();
