require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { useSofa } = require('sofa-api');
const routes = require('./main/router/routes');
const { db, sequelize, User, Posts } = require('./main/infra/models');
const context = require('./graphql/middleware');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('@graphql-tools/schema');

let corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const app = express();

app.use(cors(corsOptions));

let apolloServer = null;

async function startServer() {
	apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context,
		introspection: true,
		playground: true,
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
}

startServer();
app.use(bodyParser.json());

app.use(
	'/api',
	useSofa({
		basePath: '/api',
		schema,
		context,
	})
);

app.use(routes);

app.listen(4000, function () {
	console.log('server running on port 4000');
	console.log(`gql path is ${apolloServer.graphqlPath}`);
});
