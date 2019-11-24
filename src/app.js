require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(compression());


// Database connection setting
const db = require('./models/index.js');

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Graphql setting
import {
  ApolloServer
} from 'apollo-server-express';
import {
  auth
} from './auth.js';
import {
  schema
} from './schema.js';



// Server configration
const server = new ApolloServer({
  schema,
  tracing: false,
  cacheControl: false, //enable this when schema cache is set up
  context: auth
});

server.applyMiddleware({
  app,
  path: '/graphql'
});
app.listen({
  port: 4000
}, () => {
  console.log('Apollo Server ready on http://localhost:4000/graphql');
});