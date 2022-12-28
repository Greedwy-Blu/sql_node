const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require("http");
const routes = require('./main/router/routes');
const db = require('./main/infra/models/index')

db.sequelize.authenticate().then(() =>{//Conexion a la BD
    console.log("Estas conectado a la BD")
});
db.sequelize.sync()


const app = express();
app.use(cors());

const typeDefs = `
    type Query{
        totalPosts: Int!
    }
`;
const resolvers = {
    Query: {
        totalPosts: () => 100,
    },
};

let apolloServer = null;

async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
         context: { db },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer();
const httpserver = http.createServer(app);

app.use(routes);
app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});

app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});
