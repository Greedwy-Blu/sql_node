const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: Int!
		name: String!
		email: String!
		senha: String!
	}

	type Posts {
		id: Int!
		content: String!
		title: String!
	}

	type Query {
		getUsers(id: Int!): User
		getUser(id: Int!): User
		getPosts(id: Int!): Posts
		getPost(id: Int!): Posts
	}

	type Mutation {
		createUser(name: String!, email: String!, senha: String): User!
		createPosts(content: String!, title: String!): Posts!
	}
`;

module.exports = typeDefs;
