const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const Memcached = require("memcached");
const path = require("path");


app.use(cors());
app.use(bodyParser.json());

// Database connection setting
const db = require("./models/index.js");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Graphql setting
import { ApolloServer } from "apollo-server-express";
import { mergeSchemas } from 'graphql-toolkit';

// import graphql modules
import { UserModule } from './user/index.js';
import { TravelModule } from './travel/index.js';

const schemas = [
  UserModule.schema,
  TravelModule.schema
];

const resolvers = [
  UserModule.resolvers,
  TravelModule.resolvers
];

const mergedSchema = mergeSchemas({
  schemas,
  resolvers
})

// Server configration
const server = new ApolloServer({
  schema: mergedSchema,
  context: session => session,
  tracing: true
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 4000 }, () => {
  console.log('Apollo Server ready on http://localhost:4000/graphql');
});
