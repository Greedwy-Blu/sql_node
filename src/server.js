const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { useSofa } = require('sofa-api');
const routes = require('./main/router/routes');
const sequelize = require('./main/infra/models/index');
const { getUserId } = require('./graphql/middleware/verifyJwtToken');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

let apolloServer = null;

async function startServer() {
	apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			return {
				...req,
				sequelize,
				userId: req && req.headers.authorization ? getUserId(req) : null,
			};
		},
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
}

startServer();

app.use(
	'/api',
	useSofa({
		basePath: '/api',
		schema,
		context: ({ req }) => {
			return {
				...req,
				sequelize,
				userId: req && req.headers.authorization ? getUserId(req) : null,
			};
		},
	})
);

app.use(routes);

app.listen(4000, function () {
	console.log('server running on port 4000');
	console.log(`gql path is ${apolloServer.graphqlPath}`);
});
