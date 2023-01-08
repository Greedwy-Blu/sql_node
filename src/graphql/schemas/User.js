const { gql } = require('apollo-server-express');

module.exports = gql`
	type AuthPayload {
		token: String!
		user: User
	}

	type User {
		id: Int!
		name: String!
		email: String!
		senha: String!
	}

	extend type Query {
		getUsers: [User]
		getUser(id: Int!): User!
	}

	extend type Mutation {
		signup(email: String!, senha: String!): AuthPayload
		login(email: String!, senha: String!): AuthPayload
	}
`;
