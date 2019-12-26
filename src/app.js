require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

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
import { ApolloServer } from 'apollo-server-express';
const { MemcachedCache } = require('apollo-server-cache-memcached');
import { createServer } from 'http';
import { auth } from './auth.js';
import { schema } from './schema.js';

// Server configration
const server = new ApolloServer({
  schema,
  tracing: false,
  cacheControl: false, // enable this when schema cache is set up
  persistedQueries: {
    // client should also set up up paq
    cache: new MemcachedCache(
      ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
      {
        retries: 10,
        retry: 10000
      } // Options
    )
  },
  context: async ({ req, connection }) => {
    if (connection) {
      const token = connection.id_token;
      return await auth(token);
    } else {
      const token = req.headers.id_token || '';
      return await auth(token);
    }
  }
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4000;

httpServer.listen(
  {
    port: PORT
  },
  () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    );
  }
);
