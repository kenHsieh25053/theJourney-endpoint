const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const Memcached = require("memcached");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = require("../models/index.js");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Graphql setting
const { graphqlUploadExpress } = require("graphql-upload");
const { makeExecutableSchema } = require("graphql-tools");
import { ApolloServer } from "apollo-server-express";

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const schemaFile = path.join(__dirname, "schema.graphql");
const schema = fs.readFileSync(schemaFile, "utf8");

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers: {
      Query,
      Mutation
    },
    context: {}
  })
});

server.applyMiddleware({
  app,
  path: "/graphql"
});

app.listen({ port: 4000 }, () => {
  console.log("🚀 Server ready at http://localhost:8000/graphql");
});
