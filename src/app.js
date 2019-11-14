const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const Memcached = require('memcached');
const path = require('path');

const {
    graphqlUploadExpress
} = require('graphql-upload');
const {
    makeExecutableSchema
} = require('graphql-tools');
const {
    GraphQLServer
} = require('graphql-yoga');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

app.use(cors());
app.use(bodyParser.json());


// Graphql setting
const schemaFile = path.join(__dirname, 'schema.graphql');
const schema = fs.readFileSync(schemaFile, 'utf8');
const server = new GraphQLServer({
    schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers: {
            Query,
            Mutation
        },
        context: {},
    })
});
server.start(() => console.log('Graphql Server is running on http://localhost:4000'));