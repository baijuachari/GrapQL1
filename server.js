const express = require('express');
const graphql = require('graphql')
const { ApolloServer, gql } = require('apollo-server-express');
// const { ApolloServer, gql } = require('apollo-server');
const cors = require('cors');
const dotEnv = require('dotenv');

const resolvers = require('./resolvers');

dotEnv.config();

const {tasks, users} = require('./constants');

const app = express();
// app.use(express.json);
app.use(cors());

const typeDefs = gql`
  type Query {
    greetings: [String!]
    tasks: [Task!]
    task(id: ID!): Task
    users: [User!]
    user(id: ID!): User
  }

  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }

  type Mutation {
    createTask(input: createTaskInput!): Task
  }

  type User {
    id: ID
    name: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

apolloServer.applyMiddleware({app, path: '/graphql'});

const port = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  res.send({message: 'Hello2'});
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
  console.log(`Graphql path ${apolloServer.graphqlPath}`);

})